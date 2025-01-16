// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const { data, error } = await supabase.auth.signInWithPassword({ email, password });

//     if (error) throw error;

//     res.status(200).json({ success: true, message: 'Login successful', data });
//   } catch (error) {
//     res.status(401).json({ success: false, message: 'Login failed', error });
//   }
// };

// exports.resetPassword = async (req, res) => {
//     const { email } = req.body;
//     try {
//       const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  
//       if (error) throw error;
  
//       res.status(200).json({ success: true, message: 'Password reset email sent' });
//     } catch (error) {
//       res.status(500).json({ success: false, message: 'Failed to send password reset email', error });
//     }
//   };

const supabase = require('../utils/supabase');

// Login with email
const loginWithEmail = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  return res.status(200).json({ user: data.user });
};

// Sign up with phone
const signupWithPhone = async (req, res) => {
  const { email, phone, password, name, user, points } = req.body;

  if (!email || !password || !phone || !name || !user || !points) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const { data, error } = await supabase.auth.signUp(
    {
      email,
      password,
      phone,
      options: {
        data: {
          name,
          user,
          points: parseInt(points, 10),
          email_verified: true,
        },
      },
    }
  );

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json({ user: data.user });
};

// Reset password via email
const resetPasswordWithEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ message: 'Password reset email sent.' });
};

// Other methods like loginWithNumber, resetPasswordWithNumber, signOut can follow similar patterns

module.exports = {
  loginWithEmail,
  signupWithPhone,
  resetPasswordWithEmail,
};
