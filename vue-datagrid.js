var DataGrid = require('./src/DataGrid.vue');

module.exports = {
    install: function (Vue, options) {
        Vue.component('data-grid', DataGrid);
    },
}
