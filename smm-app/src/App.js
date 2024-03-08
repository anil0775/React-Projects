import React from "react";
import './App.css';

const LandingPage = () => {
  return (
    <div class="landing-page bg-blue-500 flex flex-col min-h-screen">
    <header class="flex flex-row justify-center items-center py-16">
      <h1 class="text-3xl font-bold text-center">Manage your social media presence from a single platform</h1>
      <p class="text-center">Our SaaS platform helps businesses of all sizes to save time and improve their social media results.</p>
    </header>
  
    <section class="flex flex-col justify-center items-center py-16">
      <h2 class="text-2xl font-bold text-center">Features</h2>
      <ul class="flex flex-col justify-center items-center py-8">
        <li class="text-lg font-medium py-2">Manage multiple social media accounts from a single platform</li>
        <li class="text-lg font-medium py-2">Schedule posts for different times of day and weeks</li>
        <li class="text-lg font-medium py-2">Track your social media performance with detailed analytics</li>
        <li class="text-lg font-medium py-2">Create and schedule engaging content</li>
        <li class="text-lg font-medium py-2">Promote your website on social media</li>
        <li class="text-lg font-medium py-2">Interact with your followers</li>
      </ul>
    </section>
  
    <section class="flex flex-col justify-center items-center py-16">
      <h2 class="text-2xl font-bold text-center">Benefits</h2>
      <ul class="flex flex-col justify-center items-center py-8">
        <li class="text-lg font-medium py-2">Save time on social media management</li>
        <li class="text-lg font-medium py-2">Improve your social media engagement</li>
        <li class="text-lg font-medium py-2">Increase website traffic from social media</li>
        <li class="text-lg font-medium py-2">Get expert assistance and support</li>
      </ul>
    </section>
  
    <section class="flex flex-row justify-center items-center py-16">
      <h2 class="text-2xl font-bold text-center">Sign up for a free trial today</h2>
      <p class="text-center">Try our SaaS platform for free and see how it can help you to achieve your social media goals.</p>
      <a href="/signup" class="btn btn-primary">Sign up for a free trial</a>
    </section>
  </div>
  );
};

export default LandingPage;