exports.getVoucherRequests = async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('voucher_requests')
        .select('*');
  
      if (error) throw error;
  
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch voucher requests', error });
    }
  };

  exports.updateVoucherRequest = async (req, res) => {
    const { requestId } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'
    try {
      const { error } = await supabase
        .from('voucher_requests')
        .update({ status })
        .eq('id', requestId);
  
      if (error) throw error;
  
      res.status(200).json({ success: true, message: `Voucher request ${status}` });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to update voucher request', error });
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