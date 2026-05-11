import { submitFeedback } from '../../api/misc';

Page({
  data: {
    type: 'bug',
    typeOptions: [
      { label: 'bug反馈', value: 'bug' },
      { label: '体验建议', value: 'suggest' },
      { label: '门店投诉', value: 'complain' }
    ],
    content: '',
    contact: '',
    submitting: false
  },

  onTypeChange(e) {
    this.setData({ type: e.currentTarget.dataset.value });
  },
  onContentInput(e) { this.setData({ content: e.detail.value }); },
  onContactInput(e) { this.setData({ contact: e.detail.value }); },

  async onSubmit() {
    if (!this.data.content.trim()) {
      wx.showToast({ title: '请填写反馈内容', icon: 'none' });
      return;
    }
    this.setData({ submitting: true });
    try {
      await submitFeedback(this.data);
      wx.showToast({ title: '提交成功' });
      setTimeout(() => wx.navigateBack(), 800);
    } finally {
      this.setData({ submitting: false });
    }
  }
});
