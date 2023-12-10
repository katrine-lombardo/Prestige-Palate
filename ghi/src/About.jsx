import React from 'react';
import { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import Loading from '../Loading';

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw new Error("VITE_APP_API_HOST was undefined.");
}

const About = () => { 
    return (
        <>
            <a class="btn btn-link btn-floating btn-lg text-dark m-1" href="#!" role="button"
                data-mdb-ripple-color="dark"><i class="fab fa-facebook-f"></i></a>

            <!--Twitter -->
            <a class="btn btn-link btn-floating btn-lg text-dark m-1" href="#!" role="button"
                data-mdb-ripple-color="dark"><i class="fab fa-twitter"></i></a>

            <!--Google -->
            <a class="btn btn-link btn-floating btn-lg text-dark m-1" href="#!" role="button"
                data-mdb-ripple-color="dark"><i class="fab fa-google"></i></a>

            <!--Instagram -->
            <a class="btn btn-link btn-floating btn-lg text-dark m-1" href="#!" role="button"
                data-mdb-ripple-color="dark"><i class="fab fa-instagram"></i></a>

            <!--Linkedin -->
            <a class="btn btn-link btn-floating btn-lg text-dark m-1" href="#!" role="button"
                data-mdb-ripple-color="dark"><i class="fab fa-linkedin"></i></a>
            <!--Github -->
            <a class="btn btn-link btn-floating btn-lg text-dark m-1" href="#!" role="button"
                data-mdb-ripple-color="dark"><i class="fab fa-github"></i></a>
        </>
    )
}

export default About; 


