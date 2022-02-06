<template>
  <div>
     <div class="modal-wrapper" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="close-wrapper">
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="$emit('close'), $emit('hide')"
        ></button>
      </div>
      <h2 class="warning">Внимание</h2>
      <p class="description">вы действительно хотите удалить <br> продукт №{{product.id}}  ???</p>
      <slot name="actions"></slot>
    </div>
  </div>

  </div>
</template>

<script>
export default {
props:[
    "product"
]
}
</script>

<style lang="scss" scoped>
.warning{
    margin-top: 20px;
}
.description{
    margin: 30px 0;
    font-weight: bold;
}
.modal-wrapper {
    z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(black, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  .modal-content {
    position: relative;
    margin: 0 auto;
    z-index: 3;
    width: 500px;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 20px 9px rgb(255 165 0 /40%);
    .close-wrapper {
      position: absolute;
      right: 10px;
      top: 10px;
      transition: all 0.3s ease;
      &:hover {
        transform: rotate(-450deg);
      }
    }
    .form {
      .form-content {
        margin-top: 30px;
        margin-bottom: 30px;
        label {
          display: flex;
          flex-direction: column;
          small {
            text-align: left;
          }
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>