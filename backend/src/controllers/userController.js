require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Get a user's voucher balance
exports.getVoucherBalance = async (req, res) => {
  const { userId } = req.params;
  try {
    const { data, error } = await supabase
      .from("user_vouchers")
      .select("quantity, vouchers(denomination)")
      .eq("user_id", userId);

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Submit a voucher request
exports.requestVouchers = async (req, res) => {
  const { userId, voucherId, positiveBehaviour, requestedVouchers } = req.body;
  try {
    const { error } = await supabase.from("voucher_requests").insert([
      {
        user_id: userId,
        voucher_id: voucherId,
        positive_behaviour: positiveBehaviour,
        requested_vouchers: requestedVouchers,
      },
    ]);

    if (error) throw error;

    res
      .status(201)
      .json({ success: true, message: "Voucher request submitted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAvailableItems = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("items")
      .select(
        "id, name, description, voucher_cost, stock, product_image, is_available"
      );

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch items", error });
  }
};

exports.getItemDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from("items")
      .select(
        "id, name, description, voucher_cost, stock, product_image, is_available"
      )
      .eq("id", id);

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch items", error });
  }
};

exports.requestItem = async (req, res) => {
  const { userId, itemId, quantity, isPreorder } = req.body;
  if (!userId || !itemId || quantity == null || isPreorder == null) {
    return res.status(400).json({
      success: false,
      message: "All fields (userId, itemId, quantity, isPreorder) are required",
      data: req.body,
    });
  }
  try {
    const { error } = await supabase.from("item_requests").insert([
      {
        user_id: userId,
        item_id: itemId,
        quantity: quantity,
        status: "pending",
        is_preorder: isPreorder,
      },
    ]);
  
    if (error) throw error;

    res
      .status(201)
      .json({ success: true, message: "Item request submitted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit item request",
      error,
    });
  }
};

exports.getTrasactionHistory = async (req, res) => {
  const { userId } = req.params

  try {
    const { data, error } = await supabase
    .from('item_requests')
    .select('*')
    .eq('userid', userId);

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
