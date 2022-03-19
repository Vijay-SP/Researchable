/* eslint-disable no-whitespace-before-property */
import React, { useState } from 'react';
import { db } from './../../firebase';
import './contact.css'
import { motion } from "framer-motion";
import Navbar from '../Navbar';
import Footer from '../Footer';

const Contact1 = () => {

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setPhone] = useState();
  const [message, setmessage] = useState("");


  const handlesubmit = async () => {

    try {
      const result = Math.random().toString(36).substring(2, 17);
      await db.collection("ContactUs").doc(result).set({
        id: result,
        name: name,
        email: email,
        message: message,
        phone: phone,
        date: Date(),

      }).then(() => {
        alert("Message sent successully");
        window.location.reload();
      })
    } catch (err) {
      console.error(err);
      alert("Message sent Failed");
    }
  };
  return (
    <>
      <Navbar />
      <motion.div

        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="con">
          <div class="container">
            <div class="content">
              <div class="left-side">
                <div class="phone details">
                  <i class="fas fa-phone-alt"></i>
                  <div class="topic">Phone</div>
                  <div class="text-one"><a href="tel:+91 92095 22812" style={{ textDecoration: "none" }}>+91 92095 22812</a></div>
                </div>
                <div class="email details">
                  <i class="fas fa-envelope"></i>
                  <div class="topic">Email</div>
                  <div class="text-two"><a href="mailto:writersworldofficial@gmail.com" style={{ textDecoration: "none" }}>writersworldofficial@gmail.com</a></div>
                </div>
              </div>
              <div class="right-side">
                <div class="topic-text">Send us a message</div>
                <p>If you have any work from us or any types of quries, feel free to reach out to us from here. It's our pleasure to help you.</p>
                <form onSubmit={handlesubmit}>
                  <div class="input-box">
                    <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setname(e.target.value)} required />
                  </div>
                  <div class="input-box">
                    <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setemail(e.target.value)} required />
                  </div>
                  <div class="input-box">
                    <input type="number" placeholder="Enter your phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  </div>
                  <div class="input-box message-box">
                    <textarea placeholder="Enter your message" value={message} onChange={(e) => setmessage(e.target.value)} required />
                  </div>
                  <div class="button">
                    <input style={{ color: "black" }} type="button" onClick={handlesubmit} value="Submit" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  )
}

export default Contact1
