exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;

    res.status(200).json({ success: true, message: 'Login successful', data });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Login failed', error });
  }
};

exports.resetPassword = async (req, res) => {
    const { email } = req.body;
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  
      if (error) throw error;
  
      res.status(200).json({ success: true, message: 'Password reset email sent' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to send password reset email', error });
    }
  };
  