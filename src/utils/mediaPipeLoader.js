// MediaPipe Script Loading Utilities
export const loadMediaPipeScriptsPose = () => {
  return new Promise((resolve, reject) => {
    const scriptSources = [
      // Primary sources with specific versions
      [
        'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3.1620248256/camera_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/control_utils@0.3.1620248256/control_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.3.1620248256/drawing_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1635988162/pose.js'
      ],
      // Alternative sources
      [
        'https://unpkg.com/@mediapipe/camera_utils@0.3.1620248256/camera_utils.js',
        'https://unpkg.com/@mediapipe/control_utils@0.3.1620248256/control_utils.js',
        'https://unpkg.com/@mediapipe/drawing_utils@0.3.1620248256/drawing_utils.js',
        'https://unpkg.com/@mediapipe/pose@0.5.1635988162/pose.js'
      ],
      // Fallback sources with different versions
      [
        'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js'
      ]
    ];

    const loadScript = (src) => {
      return new Promise((resolveScript, rejectScript) => {
        // Check if script already exists
        if (document.querySelector(`script[src="${src}"]`)) {
          console.log(`Script ${src} already loaded`);
          resolveScript();
          return;
        }
        
        console.log(`Loading script: ${src}`);
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.onload = () => {
          console.log(`Successfully loaded: ${src}`);
          resolveScript();
        };
        script.onerror = () => {
          console.error(`Failed to load script: ${src}`);
          rejectScript(new Error(`Failed to load ${src}`));
        };
        document.head.appendChild(script);
      });
    };
    
    // Try each source set
    const trySourceSet = async (sourceIndex) => {
      try {
        console.log(`Trying script source set ${sourceIndex + 1}/${scriptSources.length}`);
        const scripts = scriptSources[sourceIndex];
        
        for (const src of scripts) {
          await loadScript(src);
        }
        
        // Wait for scripts to initialize
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Check if Pose is available
        if (typeof window.Pose !== 'undefined') {
          console.log('Pose available! All MediaPipe scripts loaded successfully');
          resolve();
          return true;
        } else {
          console.log(`Source set ${sourceIndex + 1} failed, trying next...`);
          return false;
        }
      } catch (error) {
        console.warn(`Source set ${sourceIndex + 1} failed:`, error);
        return false;
      }
    };
    
    // Try all source sets
    const tryAllSources = async () => {
      for (let i = 0; i < scriptSources.length; i++) {
        const success = await trySourceSet(i);
        if (success) return;
      }
      
      // If all sources fail, try a different approach
      console.log('All CDN sources failed, trying local fallback...');
      try {
        await loadLocalFallback();
        resolve();
      } catch (error) {
        console.error('All script sources failed');
        reject(new Error('Failed to load MediaPipe scripts from all sources'));
      }
    };
    
    // Local fallback method
    const loadLocalFallback = async () => {
      // Try to load from a different CDN or use a different approach
      const fallbackScripts = [
        'https://unpkg.com/@mediapipe/camera_utils/camera_utils.js',
        'https://unpkg.com/@mediapipe/control_utils/control_utils.js',
        'https://unpkg.com/@mediapipe/drawing_utils/drawing_utils.js',
        'https://unpkg.com/@mediapipe/pose/pose.js'
      ];
      
      for (const src of fallbackScripts) {
        await loadScript(src);
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (typeof window.Pose === 'undefined') {
        throw new Error('Pose not available after fallback loading');
      }
    };
    
    tryAllSources();
  });
};

export const loadMediaPipeScriptsFace = () => {
  return new Promise(async (resolve, reject) => {
    const scriptSources = [
      // Primary sources with specific versions
      [
        'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3.1620248256/camera_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/face_mesh.js'
      ],
      // Alternative sources
      [
        'https://unpkg.com/@mediapipe/camera_utils@0.3.1620248256/camera_utils.js',
        'https://unpkg.com/@mediapipe/face_mesh@0.4.1633559619/face_mesh.js'
      ],
      // Fallback sources
      [
        'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js'
      ]
    ];
    
    const loadScript = (src) => {
      return new Promise((resolveScript, rejectScript) => {
        // Check if script already exists
        if (document.querySelector(`script[src="${src}"]`)) {
          console.log(`Script ${src} already loaded`);
          resolveScript();
          return;
        }
        
        console.log(`Loading script: ${src}`);
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.onload = () => {
          console.log(`Successfully loaded: ${src}`);
          resolveScript();
        };
        script.onerror = () => {
          console.error(`Failed to load script: ${src}`);
          rejectScript(new Error(`Failed to load ${src}`));
        };
        document.head.appendChild(script);
      });
    };
    
    // Try each source set
    const trySourceSet = async (sourceIndex) => {
      try {
        console.log(`Trying script source set ${sourceIndex + 1}/${scriptSources.length}`);
        const scripts = scriptSources[sourceIndex];
        
        for (const src of scripts) {
          await loadScript(src);
        }
        
        // Wait for scripts to initialize
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Check if FaceMesh is available
        if (typeof window.FaceMesh !== 'undefined') {
          console.log('FaceMesh available! All MediaPipe scripts loaded successfully');
          resolve();
          return true;
        } else {
          console.log(`Source set ${sourceIndex + 1} failed, trying next...`);
          return false;
        }
      } catch (error) {
        console.warn(`Source set ${sourceIndex + 1} failed:`, error);
        return false;
      }
    };
    
    // Try all source sets
    const tryAllSources = async () => {
      for (let i = 0; i < scriptSources.length; i++) {
        const success = await trySourceSet(i);
        if (success) return;
      }
      
      // If all sources fail, try a different approach
      console.log('All CDN sources failed, trying local fallback...');
      try {
        await loadLocalFallback();
        resolve();
      } catch (error) {
        console.error('All script sources failed');
        reject(new Error('Failed to load MediaPipe scripts from all sources'));
      }
    };
    
    // Local fallback method
    const loadLocalFallback = async () => {
      // Try to load from a different CDN or use a different approach
      const fallbackScripts = [
        'https://unpkg.com/@mediapipe/camera_utils/camera_utils.js',
        'https://unpkg.com/@mediapipe/face_mesh/face_mesh.js'
      ];
      
      for (const src of fallbackScripts) {
        await loadScript(src);
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (typeof window.FaceMesh === 'undefined') {
        throw new Error('FaceMesh not available after fallback loading');
      }
    };
    
    tryAllSources();
  });
}; 