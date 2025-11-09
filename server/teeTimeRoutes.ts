import { Router, Request, Response, NextFunction } from 'express';
import { storage } from './storage';
import { isAuthenticated } from './auth';
import { z } from 'zod';

// Extend the Express Request type to include user information
declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      role: string;
    }

    interface Request {
      user?: User;
    }
  }
}

const router = Router();

// Get all tee times for the current user
router.get('/tee-times', isAuthenticated, async (req, res) => {
  try {
    // In a real app, you'd filter by the current user's ID
    const teeTimes = await storage.getTeeTimes();
    res.json(teeTimes);
  } catch (error) {
    console.error('Error fetching tee times:', error);
    res.status(500).json({ message: 'Failed to fetch tee times' });
  }
});

// Get scores for a specific tee time
router.get('/tee-times/:id/scores', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const scores = await storage.getTeeTimeScores(id);
    res.json(scores);
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ message: 'Failed to fetch scores' });
  }
});

// Save scores for a tee time
router.post('/tee-times/:id/scores', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { scores } = req.body;
    
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    // Validate input
    const scoreSchema = z.object({
      holeNumber: z.number().int().min(1).max(18),
      score: z.number().int().min(1),
      putts: z.number().int().min(0).optional(),
      fairwayHit: z.boolean().optional(),
      greensInRegulation: z.boolean().optional(),
      sandSave: z.boolean().optional(),
    });
    
    const playerScoresSchema = z.record(
      z.string().uuid(),
      z.object({
        name: z.string(),
        handicap: z.number(),
        scores: z.array(scoreSchema),
        total: z.number(),
        verified: z.boolean()
      })
    );
    
    const validation = playerScoresSchema.safeParse(scores);
    if (!validation.success) {
      return res.status(400).json({ 
        message: 'Invalid scores format',
        errors: validation.error.errors 
      });
    }
    
    // In a real app, verify the user has permission to save these scores
    await storage.saveTeeTimeScores(id, req.user.id, scores);
    
    res.json({ message: 'Scores saved successfully' });
  } catch (error) {
    console.error('Error saving scores:', error);
    res.status(500).json({ message: 'Failed to save scores' });
  }
});

// Verify scores with a verification code
router.post('/tee-times/:id/verify', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { playerId, verificationCode, verified } = req.body;
    
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    if (typeof verified !== 'boolean') {
      return res.status(400).json({ message: 'Invalid verification status' });
    }
    
    // In a real app, you'd:
    // 1. Verify the verification code matches the player's code
    // 2. Check if the current user is authorized to verify these scores
    // 3. Update the verification status in the database
    
    // For now, we'll just return success if a code is provided
    if (!verificationCode) {
      return res.status(400).json({ message: 'Verification code is required' });
    }
    
    await storage.verifyTeeTimeScores(id, playerId, req.user.id, verified);
    
    res.json({ 
      message: verified ? 'Scores verified successfully' : 'Verification removed',
      verified 
    });
  } catch (error) {
    console.error('Error verifying scores:', error);
    res.status(500).json({ message: 'Failed to verify scores' });
  }
});

// Generate a verification code for the current user's scores
router.post('/tee-times/:id/generate-code', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    
    // In a real app, you'd:
    // 1. Check if the user is a player in this tee time
    // 2. Generate a unique verification code
    // 3. Store it in the database with an expiration time
    
    // For now, we'll generate a simple 6-digit code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // In a real app, you'd save this to the database
    // await storage.saveVerificationCode(id, req.user.id, verificationCode);
    
    res.json({ verificationCode });
  } catch (error) {
    console.error('Error generating verification code:', error);
    res.status(500).json({ message: 'Failed to generate verification code' });
  }
});

export default router;
