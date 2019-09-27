<template>
 <div class="page arrow-demo">
   <h4>arrow demo</h4>
   <div id="ex3-common-parent" class="arrow-panel" style="position: relative;">
     <div class="d-block space-30"></div>

     <div class="d-block">
       <div class=" ui-draggable"></div>

       <div class="ui-draggable" >
         <div class="btn btn-primary btn-block ex3-ceo">CEO<br><small>Vladimir Evstegneev</small></div>
       </div>

       <div class="ui-draggable" >
         <div class="btn btn-primary btn-block ex3-coo">COO<br><small>Ruslan Dobrolubov</small></div>
       </div>
     </div>

     <div class="space-40"></div>

     <div class="d-block">
       <div class="ui-draggable">
         <div class="btn btn-default btn-block ex3-dep">Sales</div>
         <div class="btn btn-warning btn-block">Stepan Fedotov</div>
         <div class="btn btn-info btn-block">Konstantin Shishkin</div>
       </div>

       <div class="ui-draggable">
         <div class="btn btn-default btn-block ex3-dep">Finances</div>
         <div class="btn btn-warning btn-block">Mariya Nikolaeva</div>
         <div class="btn btn-info btn-block">Elena Abashina</div>
         <div class="btn btn-info btn-block">Munira Abdinazarova</div>
       </div>

       <div class="ui-draggable" >
         <div class="btn btn-default btn-block ex3-dep">IT</div>
         <div class="btn btn-warning btn-block">Mikhail Soloviev</div>
         <div class="btn btn-info btn-block">Tasya Hlebnikova</div>
       </div>

       <div class="ui-draggable">
         <div class="btn btn-default btn-block ex3-dep-emp">Logistic</div>
         <div class="btn btn-info btn-block">Leonid Voroncov</div>
       </div>
     </div>

     <div class="row space-50"></div>
   </div>
 </div>
</template>

<script>
  import Arrow from '../plugins/arrow'
  export default {
    name: 'arrow-demo',
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.arrow = new Arrow('#ex3-common-parent', {render: {lineWidth: 3, strokeStyle: '#992E2E'}})
        this.arrow.arrow('.ex3-ceo', '.ex3-coo', {
          arrow: {arrowType: 'double-headed'},
          render: {strokeStyle: '#617783'}
        }).arrow('.ex3-ceo', '.ex3-dep').arrow('.ex3-coo', '.ex3-dep-emp', {
          arrow: {
            connectionType: 'side',
            sideFrom: 'right',
            sideTo: 'top'
          }
        })
      }
    },
    data () {
      return {
        arrow: undefined
      }
    }
  }
</script>
<style>
  .d-block {
    display: flex;
  }
  .d-block div {
    flex: 1;
  }
  .arrow-demo h4 {
    margin: 15px;
  }
  .arrow-panel {
    padding: 15px;
  }
  .space-50 {
    height: 50px;
  }
  .space-40 {
    height: 40px;
  }
  .btn {
    display: inline-block;
    margin-bottom: 0;
    font-weight: normal;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    background-image: none;
    border: 1px solid #2e2f2f;
    white-space: nowrap;
    padding: 8px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
  }
  .btn.btn-block {
    display: block
  }
  .ui-draggable {
    padding: 15px;
  }
  .btn-default {
    color: #fff;
    background-color: #474949;
    border-color: #474949;
  }
  .btn-block+.btn-block {
    margin-top: 5px;
  }
  .btn-warning {
    color: #fff;
    background-color: #ebc41e;
    filter: none;
    border: 1px solid #c5a211;
  }
  .btn-primary {
    filter: none;
    border: 1px solid #912b2b;
    color: #fff;
    background-color: #b83737;
  }
  .btn-info {
    filter: none;
    border: 1px solid #69828f;
    color: #fff;
    background-color: #869ba5;
  }
</style>

