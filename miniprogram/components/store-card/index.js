Component({
  options: { addGlobalClass: true },
  properties: {
    store: { type: Object, value: {} }
  },
  methods: {
    onTap() {
      this.triggerEvent('tap', { store: this.data.store });
    }
  }
});
