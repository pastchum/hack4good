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

// login with number
const loginWithNumber = async (req, res) => {
  const { phone, password } = req.body;

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ user: data.user });
};

// Sign up with phone
const signup = async (req, res) => {
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
          points: parseInt(points),
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

// reset password with number
const resetPasswordWithNumber = async(req, res) => {
  const { phone } = await supabase.auth.signInWithOtp(phone)

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ message: "OTP sent" })
}

// Sign out function
const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ message: 'User successfully logged out' });
}

module.exports = {
  loginWithEmail,
  loginWithNumber,
  signup,
  resetPasswordWithEmail,
  resetPasswordWithNumber,
  signOut
};
