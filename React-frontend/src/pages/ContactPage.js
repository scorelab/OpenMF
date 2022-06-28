/*
* Contact Page Component
*/

// Import Dependecies
import React from 'react';
import Layout from '../components/core/Layout';
import ContactForm from '../components/core/ContactForm';


// Main AboutPage Component
const AboutPage = () => {
    return (
        <Layout sidebarBool={false}>
            <h1>Contact page</h1>
            <ContactForm />
        </Layout>
    )
}

export default AboutPage
