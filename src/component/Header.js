const Header = () => {
    return `
        <header class="header">

            <div class="logo">
                <a href="/">SmartCommerce</a>
            </div>

            <div class="search-box">
                <input 
                    type="text" 
                    placeholder="Search products, vendors..."
                />
                <button type="button">Search</button>
            </div>

            <nav class="nav-menu">
                <a href="/">Home</a>
                <a href="/products">Products</a>
                <a href="/vendors">Vendors</a>
                <a href="/cart">Cart 🛒</a>
                <a href="/login">Login</a>
            </nav>

        </header>
    `;
};

export default  Header;