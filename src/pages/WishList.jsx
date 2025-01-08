import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productsSlice';
import { addItemToCart } from '../redux/cartSlice';
import { showToast } from '../utils/Toast';
import BackBtn from '../components/common/BackBtn';
import { ShoppingBag, Trash2 } from 'lucide-react';
const WishList = () => {
    const [storedWishlist, setStoredWishlist] = useState([]);
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(({ products }) => products);

    // Fetch products on component mount
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Retrieve wishlist from localStorage
    useEffect(() => {
        try {
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            setStoredWishlist(wishlist);
        } catch (err) {
            console.error('Failed to parse wishlist from localStorage:', err);
        }
    }, []);

    // Filter products based on stored wishlist
    const wishlist = useMemo(() => {
        const wishlistProductIds = storedWishlist.map((item) => item.productId);
        return products.filter((product) => wishlistProductIds.includes(product._id));
    }, [products, storedWishlist]);

    const handleAddToCart = (product) => {
        dispatch(addItemToCart({ productId: product._id, quantity: 1 }));
        showToast('تم اضافة المنتج الى السلة', 'success');    
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return <p className="text-center p-4 text-red-500">Failed to load products.</p>;
    }

    return (
        
        <section className="bg-gray-200 w-full  relative  min-h-screen mx-auto  p-8  " style={{ direction: "rtl" }}>
            <BackBtn/>
            <div className="mx-auto relative  px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <header className="text-left mb-8">
                    <h1 className="text-2xl text-center font-bold text-gray-900 sm:text-3xl">
                       سلة الامنيات
                    </h1>
                </header>

                {wishlist.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className="text-slate-800">
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishlist.map((product) => (
                                    <tr key={product._id}>
                                      
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={product.images[0]}
                                                            alt={product.name}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{product.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>${product.price}</td>
                                        <td>
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                className="btn btn-ghost btn-xs"
                                            >
                                                <ShoppingBag size={20} />
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    const updatedWishlist = storedWishlist.filter(
                                                        (item) => item.productId !== product._id
                                                    );
                                                    setStoredWishlist(updatedWishlist);
                                                    localStorage.setItem(
                                                        'wishlist',
                                                        JSON.stringify(updatedWishlist)
                                                    );
                                                }}
                                                className="btn btn-ghost btn-xs"
                                            >
                                                <Trash2 size={20} className='text-red-600' />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center">
                            <p className="text-gray-500">
                                قائمة الامنيات فارغة
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default WishList;
