require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.getVoucherRequests = async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('voucher_requests')
        .select('*');
  
      if (error) {
        console.error('Supabase Error:', error); // Log the error
        throw error;
      }
  
      console.log('Fetched Data:', data); // Log the fetched data for debugging
      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error('Error Fetching Voucher Requests:', error); // Log any caught error
      res.status(500).json({ success: false, message: 'Failed to fetch voucher requests', error: error.message });
    }
  };

exports.updateVoucherRequest = async (req, res) => {
  const { requestId } = req.params; // Request ID to process
  const { status } = req.body; // Status can be 'approved' or 'rejected'

  try {
    // Step 1: Fetch the voucher request details
    const { data: request, error: requestError } = await supabase
      .from('voucher_requests')
      .select('user_id, voucher_id, requested_vouchers')
      .eq('id', requestId)
      .single();

    if (requestError || !request) {
      return res.status(404).json({ success: false, message: 'Voucher request not found' });
    }

    const { user_id, voucher_id, requested_vouchers } = request;

    if (status === 'approved') {
      // Step 2: Validate the voucher ID exists
      const { data: voucher, error: voucherError } = await supabase
        .from('vouchers')
        .select('*')
        .eq('id', voucher_id)
        .single();

      if (voucherError || !voucher) {
        return res.status(404).json({ success: false, message: 'Invalid voucher ID' });
      }

      // Step 3: Increment the user's balance for the specific voucher
      const { error: updateError } = await supabase
        .rpc('increment_voucher_quantity', {
          user_id,
          voucher_id,
          increment_by: requested_vouchers,
        });

      if (updateError) {
        console.error('RPC Error:', updateError);
        return res.status(500).json({ success: false, message: 'Failed to update voucher balance', error: updateError.message });
      }
    }

    // Step 4: Update the status of the voucher request
    const { error: statusError } = await supabase
      .from('voucher_requests')
      .update({ status })
      .eq('id', requestId);

    if (statusError) {
      console.error('Status Update Error:', statusError);
      return res.status(500).json({ success: false, message: 'Failed to update request status', error: statusError.message });
    }

    res.status(200).json({ success: true, message: `Request ${status}` });
  } catch (error) {
    console.error('Error Updating Voucher Request:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
  

  // View items
exports.getItems = async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*');
  
      if (error) throw error;
  
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch items', error });
    }
  };
  
  // Update inventory
  exports.updateItemInventory = async (req, res) => {
    const { itemId } = req.params;
    const { stock, voucherCost } = req.body;
    try {
      const { error } = await supabase
        .from('items')
        .update({ stock, voucher_cost: voucherCost })
        .eq('id', itemId);
  
      if (error) throw error;
  
      res.status(200).json({ success: true, message: 'Item inventory updated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to update inventory', error });
    }
  };

  // Add a new user
exports.addNewUser = async (req, res) => {
  const {name, email, phone } = req.body;

  try {
    const { data, error } = await supabase
      .from('users') // Specify the 'users' table
      .insert([{ email, phone, name }]); // Insert a new user record

    if (error) throw error;

    res.status(201).json({ 
      success: true, 
      message: 'User added successfully', 
      data 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to add new user', 
      error 
    });
  }
};
