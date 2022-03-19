/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Carausal.css";

const Carausal = () => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    setCount(1);
  }, [count]);
  return (
    <section id="hero" class="d-flex align-items-center">
      <div class="container" data-aos="zoom-out" data-aos-delay="100">
        <h1>Welcome to <span>Researchable</span></h1>
        <h2>read amazing research papers, collab with learners and get guidance by mentors</h2>
      </div>
    </section>
  );
};

export default Carausal;
