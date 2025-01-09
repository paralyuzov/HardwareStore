<script>
export default {
  name: "FooterComponent",
};
</script>

<template>
  <footer class="bg-sky-500 text-black py-10 px-6">
    <div class="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <div>
        <h3 class="text-2xl font-bold text-black mb-4 font-orbitron">HardwareStore</h3>
        <p class="text-black">
          Your one-stop shop for all your tech needs. Quality products, great prices, and excellent support.
        </p>
      </div>

      <div>
        <h4 class="text-lg font-semibold text-black mb-4">Quick Links</h4>
        <ul class="space-y-2">
          <li>
            <a href="#" class="hover:text-gray-100 pointer-events-none">Home</a>
          </li>
          <li>
            <a href="#" class="hover:text-gray-100 pointer-events-none">Shop</a>
          </li>
          <li>
            <a href="#" class="hover:text-gray-100 pointer-events-none">About Us</a>
          </li>
          <li>
            <a href="#" class="hover:text-gray-100 pointer-events-none">Contact</a>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="text-lg font-semibold text-black mb-4">Support</h4>
        <ul class="space-y-2">
          <li>
            <a href="#" class="hover:text-gray-100 pointer-events-none">FAQs</a>
          </li>
          <li>
            <a href="#" class="hover:text-gray-100 pointer-events-none">Shipping & Returns</a>
          </li>
          <li>
            <a href="#" class="hover:text-gray-100 pointer-events-none">Warranty</a>
          </li>
          <li>
            <a href="#" class="hover:text-gray-100 pointer-events-none">Terms & Conditions</a>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="text-lg font-semibold text-black mb-4">Follow Us</h4>
        <div class="flex space-x-4 text-white">
          <a
            href="#"
            class="p-2 bg-black rounded-full hover:bg-gray-600 pointer-events-none"
          >
            <i class="fab fa-facebook-f text-lg"></i>
          </a>
          <a
            href="#"
            class="p-2 bg-black rounded-full hover:bg-gray-600 pointer-events-none"
          >
            <i class="fab fa-twitter text-lg"></i>
          </a>
          <a
            href="#"
            class="p-2 bg-black rounded-full hover:bg-gray-600 pointer-events-none"
          >
            <i class="fab fa-instagram text-lg"></i>
          </a>
          <a
            href="#"
            class="p-2 bg-black rounded-full hover:bg-gray-600 pointer-events-none"
          >
            <i class="fab fa-linkedin-in text-lg"></i>
          </a>
        </div>
      </div>
    </div>

    <div class="text-center text-black mt-8 border-t border-gray-700 pt-4">
      <p>
        &copy; {{ new Date().getFullYear() }} <span class="text-white">HardwareStore</span>.
        All Rights Reserved.
      </p>
    </div>
  </footer>
</template>
