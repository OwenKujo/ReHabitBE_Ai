const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { pool } = require('../config/database');

const router = express.Router();

// Get user by ID (protected route)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const client = await pool.connect();
    const result = await client.query(
      'SELECT id, name, email, created_at FROM rehabit_user WHERE id = $1',
      [id]
    );
    client.release();

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: result.rows[0]
    });

  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user's scores summary
router.get('/me/scores', authenticateToken, async (req, res) => {
  try {
    const client = await pool.connect();
    
    // Get user's scores with move type breakdown
    const scoresResult = await client.query(`
      SELECT 
        move_type,
        COUNT(*) as total_sessions,
        AVG(score) as average_score,
        MAX(score) as best_score,
        SUM(duration) as total_duration,
        AVG(accuracy) as average_accuracy
      FROM scores 
      WHERE user_id = $1 
      GROUP BY move_type
      ORDER BY move_type
    `, [req.user.id]);

    // Get recent scores
    const recentScoresResult = await client.query(`
      SELECT 
        id,
        move_type,
        score,
        duration,
        accuracy,
        created_at
      FROM scores 
      WHERE user_id = $1 
      ORDER BY created_at DESC 
      LIMIT 10
    `, [req.user.id]);

    client.release();

    res.json({
      summary: scoresResult.rows,
      recent_scores: recentScoresResult.rows
    });

  } catch (err) {
    console.error('Get user scores error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
router.put('/me', authenticateToken, async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const client = await pool.connect();
    
    // Check if email is already taken by another user
    const existingUser = await client.query(
      'SELECT id FROM rehabit_user WHERE email = $1 AND id != $2',
      [email, req.user.id]
    );

    if (existingUser.rows.length > 0) {
      client.release();
      return res.status(409).json({ error: 'Email is already taken' });
    }

    // Update user
    const result = await client.query(
      'UPDATE rehabit_user SET name = $1, email = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING id, name, email, updated_at',
      [name, email, req.user.id]
    );

    client.release();

    res.json({
      message: 'Profile updated successfully',
      user: result.rows[0]
    });

  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 