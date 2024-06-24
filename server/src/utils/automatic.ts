import orderServices from '~/services/orders.services'

const automatic = async () => {
  try {
    await orderServices.updateOrderStatus()
  } catch (error) {
    console.log(error)
    throw error
  }
}

setInterval(automatic, 5* 1000)
// 12 * 60 * 60 * 1000
automatic()
