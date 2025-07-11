import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const sampleProducts = [
    {
        name: "Smart Watch Pro",
        price: 2999,
        image: "https://i.imgur.com/MN4sVBe.png",
        description: "Smart watch with GPS, health monitoring, and water resistance.",
    },
    {
        name: "Wireless Earbuds",
        price: 1499,
        image: "https://i.imgur.com/G1q8gR7.png",
        description: "Noise-canceling earbuds with 30-hour battery life.",
    },
    {
        name: "Denim Jacket",
        price: 1899,
        image: "https://i.imgur.com/hUuFq2F.png",
        description: "Stylish and durable denim jacket for all seasons.",
    },
    {
        name: "Fitness Tracker Band",
        price: 999,
        image: "https://i.imgur.com/EaKZp9Z.png",
        description: "Track your activity, sleep, and heart rate all day.",
    },
    {
        name: "Bluetooth Speaker",
        price: 1299,
        image: "https://i.imgur.com/09ZwQ4v.png",
        description: "Portable speaker with rich bass and waterproof design.",
    },
];

export const seedProducts = async () => {
    for (const product of sampleProducts) {
        try {
            await addDoc(collection(db, 'products'), product);
            console.log('Added:', product.name);
        } catch (err) {
            console.error('Error adding product:', product.name, err);
        }
    }
};
