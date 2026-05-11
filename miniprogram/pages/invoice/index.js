import { applyInvoice } from '../../api/misc';

Page({
  data: {
    type: 'company',
    title: '',
    taxNo: '',
    email: '',
    submitting: false
  },

  onTypeChange(e) { this.setData({ type: e.currentTarget.dataset.value, taxNo: '' }); },
  onInput(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({ [field]: e.detail.value });
  },

  async onSubmit() {
    if (!this.data.title) { wx.showToast({ title: '请填写抬头', icon: 'none' }); return; }
    if (this.data.type === 'company' && !this.data.taxNo) { wx.showToast({ title: '请填写税号', icon: 'none' }); return; }
    if (!this.data.email) { wx.showToast({ title: '请填写邮箱', icon: 'none' }); return; }
    this.setData({ submitting: true });
    try {
      await applyInvoice(this.data);
      wx.showToast({ title: '已提交，将于3日内开具' });
      setTimeout(() => wx.navigateBack(), 1000);
    } finally {
      this.setData({ submitting: false });
    }
  }
});
