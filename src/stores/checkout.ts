import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCheckoutStore = defineStore('checkout', {
  state: () => {
    const step = ref<number>(1)

    const deliveryDetails = ref({
      dropshipper: false,
      name: '',
      dropshipperName: '',
      phoneNumber: '',
      dropshipperPhoneNumber: '',
      deliveryAddress: '',
      shipment: '',
      payment: ''
    })

    const setStep = (value: 1 | 2 | 3) => {
      step.value = value
    }

    const setDeliveryDetails = (data: any) => {
      deliveryDetails.value = data
    }

    const reset = () => {
      step.value = 1
      deliveryDetails.value = {
        dropshipper: false,
        name: '',
        dropshipperName: '',
        phoneNumber: '',
        dropshipperPhoneNumber: '',
        deliveryAddress: '',
        shipment: '',
        payment: ''
      }
    }

    return { step, setStep, deliveryDetails, setDeliveryDetails, reset }
  },
  persist: true
})
