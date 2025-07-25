import mongoose, { model, Schema } from 'mongoose';

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

const ProductModel = mongoose.model("ProductModel", productSchema);
export { ProductModel };