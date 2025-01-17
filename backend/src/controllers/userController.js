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
exports.requestVoucher = async (req, res) => {
  const { userId, taskId } = req.body; // Get the user ID and task ID from the request body

  try {
    // Step 1: Fetch task details
    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .select('id, name, voucher_id, denomination')
      .eq('id', taskId)
      .single();

    if (taskError || !task) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found', 
        error: taskError 
      });
    }

    // Step 2: Insert a new voucher request
    const { error: insertError } = await supabase
      .from('voucher_requests')
      .insert([
        {
          user_id: userId,
          task_id: task.id,
          voucher_id: task.voucher_id,
          requested_vouchers: task.denomination,
          status: 'pending', // Default status for new requests
          created_at: new Date() // Optional: Supabase auto-handles this
        }
      ]);

    if (insertError) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to create voucher request', 
        error: insertError 
      });
    }

    res.status(201).json({ 
      success: true, 
      message: `Voucher request created for task: "${task.name}"`, 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create voucher request', 
      error 
    });
  }
};

//Complete as task and request a voucher
exports.completeTask = async (req, res) => {
  const { userId, taskId } = req.body;

  try {
    // Fetch task details
    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .select('voucher_id, denomination')
      .eq('id', taskId)
      .single();

    if (taskError || !task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Create a voucher request for the completed task
    const { error: requestError } = await supabase
      .from('voucher_requests')
      .insert([
        {
          user_id: userId,
          voucher_id: task.voucher_id,
          task_id: taskId,
          requested_vouchers: task.denomination,
          status: 'pending'
        }
      ]);

    if (requestError) throw requestError;

    res.status(201).json({ success: true, message: 'Task completed and request submitted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to complete task', error });
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
  const { userId, itemId, quantity, isPreorder, cost } = req.body;
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
        cost: cost,
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
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("item_requests")
      .select("*")
      .eq("user_id", id);

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTransactionDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("item_requests")
      .select("*")
      .eq("id", id);

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.cancelTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("item_requests")
      .update({ status: "cancelled" })
      .eq("id", id);

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
