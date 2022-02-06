<template>
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
      <form class="form">
        <div class="form-content">
            <label for="">
            <small>Тип продукта:</small>
            <input type="number" name="" v-model="product_type_id" />
          </label>
          <label for="">
            <small>Название товара</small>
            <input type="text" name="" v-model="name_uz" />
          </label>
          <label for="">
            <small>Цена товара:</small>
            <input type="number" name="" v-model="cost" />
          </label>
          <label for="">
            <small>Адрес:</small>
            <input type="text" name=""  v-model="address"/>
          </label>
          <button class="btn btn-warning"
          @click.prevent="createProduct"
          >Создать продукт</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      name_uz: "",
      cost: "",
      address: "",
      product_type_id: "",
      created_date: "",
    };
  },
  methods:{
     async createProduct(){
         const newProduct = {
             name_uz: this.name_uz,
             cost: this.cost,
             address: this.address,
             product_type_id: this.product_type_id,
             created_date: Date.now(),
         }
         await axios.post(`http://94.158.54.194:9092/api/product`, newProduct)
         this.$emit("close")
         this.$emit("hide")
         this.$emit("fetchData")
      }
  }
};
</script>

<style lang="scss" scoped>
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
