const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const { pool } = require('../config/database');

const router = express.Router();

// Get all scores for a user (authenticated)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { move_type, limit = 50, offset = 0 } = req.query;
    
    let query = `
      SELECT id, move_type, score, duration, accuracy, created_at
      FROM scores 
      WHERE user_id = $1
    `;
    let params = [req.user.id];
    let paramIndex = 2;

    if (move_type && ['move_1', 'move_2'].includes(move_type)) {
      query += ` AND move_type = $${paramIndex}`;
      params.push(move_type);
      paramIndex++;
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(parseInt(limit), parseInt(offset));

    const client = await pool.connect();
    const result = await client.query(query, params);
    client.release();

    res.json({
      scores: result.rows,
      count: result.rows.length
    });

  } catch (err) {
    console.error('Get scores error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get score statistics for a user
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const { move_type } = req.query;
    
    let query = `
      SELECT 
        move_type,
        COUNT(*) as total_sessions,
        AVG(score) as average_score,
        MAX(score) as best_score,
        MIN(score) as worst_score,
        SUM(duration) as total_duration,
        AVG(accuracy) as average_accuracy,
        COUNT(CASE WHEN score >= 80 THEN 1 END) as excellent_sessions,
        COUNT(CASE WHEN score >= 60 AND score < 80 THEN 1 END) as good_sessions,
        COUNT(CASE WHEN score < 60 THEN 1 END) as poor_sessions
      FROM scores 
      WHERE user_id = $1
    `;
    let params = [req.user.id];

    if (move_type && ['move_1', 'move_2'].includes(move_type)) {
      query += ` AND move_type = $2`;
      params.push(move_type);
    }

    query += ` GROUP BY move_type ORDER BY move_type`;

    const client = await pool.connect();
    const result = await client.query(query, params);
    client.release();

    res.json({
      statistics: result.rows
    });

  } catch (err) {
    console.error('Get score stats error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new score
router.post('/', [
  authenticateToken,
  body('move_type').isIn(['move_1', 'move_2']).withMessage('Move type must be move_1 or move_2'),
  body('score').isFloat({ min: 0, max: 100 }).withMessage('Score must be between 0 and 100'),
  body('duration').isInt({ min: 1 }).withMessage('Duration must be a positive integer'),
  body('accuracy').optional().isFloat({ min: 0, max: 100 }).withMessage('Accuracy must be between 0 and 100')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { move_type, score, duration, accuracy } = req.body;

    const client = await pool.connect();
    const result = await client.query(
      `INSERT INTO scores (user_id, move_type, score, duration, accuracy) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, move_type, score, duration, accuracy, created_at`,
      [req.user.id, move_type, score, duration, accuracy]
    );
    client.release();

    res.status(201).json({
      message: 'Score created successfully',
      score: result.rows[0]
    });

  } catch (err) {
    console.error('Create score error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific score by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const client = await pool.connect();
    const result = await client.query(
      'SELECT id, move_type, score, duration, accuracy, created_at FROM scores WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );
    client.release();

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Score not found' });
    }

    res.json({
      score: result.rows[0]
    });

  } catch (err) {
    console.error('Get score error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a score
router.put('/:id', [
  authenticateToken,
  body('score').optional().isFloat({ min: 0, max: 100 }).withMessage('Score must be between 0 and 100'),
  body('duration').optional().isInt({ min: 1 }).withMessage('Duration must be a positive integer'),
  body('accuracy').optional().isFloat({ min: 0, max: 100 }).withMessage('Accuracy must be between 0 and 100')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { id } = req.params;
    const { score, duration, accuracy } = req.body;

    // Build dynamic update query
    const updates = [];
    const values = [];
    let paramIndex = 1;

    if (score !== undefined) {
      updates.push(`score = $${paramIndex}`);
      values.push(score);
      paramIndex++;
    }
    if (duration !== undefined) {
      updates.push(`duration = $${paramIndex}`);
      values.push(duration);
      paramIndex++;
    }
    if (accuracy !== undefined) {
      updates.push(`accuracy = $${paramIndex}`);
      values.push(accuracy);
      paramIndex++;
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(req.user.id, id);
    const query = `
      UPDATE scores 
      SET ${updates.join(', ')} 
      WHERE user_id = $${paramIndex} AND id = $${paramIndex + 1}
      RETURNING id, move_type, score, duration, accuracy, created_at
    `;

    const client = await pool.connect();
    const result = await client.query(query, values);
    client.release();

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Score not found or not authorized' });
    }

    res.json({
      message: 'Score updated successfully',
      score: result.rows[0]
    });

  } catch (err) {
    console.error('Update score error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a score
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const client = await pool.connect();
    const result = await client.query(
      'DELETE FROM scores WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.user.id]
    );
    client.release();

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Score not found or not authorized' });
    }

    res.json({
      message: 'Score deleted successfully'
    });

  } catch (err) {
    console.error('Delete score error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get leaderboard for a specific move type
router.get('/leaderboard/:move_type', async (req, res) => {
  try {
    const { move_type } = req.params;
    const { limit = 10 } = req.query;

    if (!['move_1', 'move_2'].includes(move_type)) {
      return res.status(400).json({ error: 'Invalid move type' });
    }

    const client = await pool.connect();
    const result = await client.query(`
      SELECT 
        s.score,
        s.duration,
        s.accuracy,
        s.created_at,
        u.name as user_name
      FROM scores s
      JOIN rehabit_user u ON s.user_id = u.id
      WHERE s.move_type = $1
      ORDER BY s.score DESC, s.created_at ASC
      LIMIT $2
    `, [move_type, parseInt(limit)]);
    client.release();

    res.json({
      move_type,
      leaderboard: result.rows
    });

  } catch (err) {
    console.error('Get leaderboard error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 