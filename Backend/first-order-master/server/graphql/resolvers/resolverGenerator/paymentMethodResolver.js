import PaymentMethod from "../../../models/paymentMethod";

export async function addPaymentMethod(args) {
    const { name } = args.userInput;

    const tmpPaymentMethod = {
        name: name
    };

    let paymentMethod = new PaymentMethod(tmpPaymentMethod);

    console.log(paymentMethod);

    let result = await paymentMethod.saveAll().then(result => {
        return result;
    });

    return result;
}
