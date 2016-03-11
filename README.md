# vue-datagrid
A generic Vue component that allows you to handle paginating, searching and ordering api resources. 

## Installation
At the moment, this module isn't registered with NPM, but you can still install using the link to this repo
```
npm install --save git+https://github.com/CroudSupport/vue-datagrid.git
```

To use the datagrid component in Vue, you should install the plugin like so
```
Vue.use(vue-datagrid)
```

## Basic Usage
To build a basic data grid, just pass through a vue resource and an array of headers/columns that you want to display.  

```
<template>
  <data-grid :resource="resource" :headers="headers"></data-grid>
</template>

<script>
  data() {
    return {
      resource: this.$resource('/users'),
      headers: [
        {
          label: 'Name',
          column: 'user_id',
          path: 'name',
        },
        {
          label: 'Email Address',
          path: 'email',
        },
        {
          label: 'Date',
          column: 'created_at',
          path: 'created_at.date',
        },
      ],
    }
  },
</script>
```

### Props
The rows returned by the API are exposed as a prop so the parent component can share and use the data
```
<data-grid :rows.sync="events" :resource="resource" :headers="headers"></data-grid>
```
You can pass other props to customize the datagrid defaults
```
<data-grid :rows.sync="events" :resource="resource" :headers="headers" :before-api-call="before" :per-page="10" direction="asc">
```

### Slots
You can overide sections of the datagrid by using the named slots. A useful example would be the 'Rows' slot where you can build your own custom template to display the data
```
  <data-grid :rows.sync="events" :resource="resource" :headers="headers" :before-api-call="before" :per-page="10" direction="asc">
    <div slot="rows" class="ui center aligned middle aligned vertically divided grid">
      <div v-for="row in events" class="ui three column row">
        <div class="ui column">{{ row.name }}</div>
        <div class="ui column">{{ row.email }}</div>
        <div class="ui column">{{ row.created_at.date | moment "dddd, MMMM Do YYYY" }}</div>
      </div>
    </div>
  </data-grid>
```
You can override the header and pagination slot in a similar manor
