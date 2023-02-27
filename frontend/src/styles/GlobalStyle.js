import { createGlobalStyle } from "styled-components"

import Roboto from 'styles/fonts/Roboto/Roboto-Regular.ttf'
import Poppins from 'styles/fonts/Poppins/Poppins-Regular.ttf'
import Questrial from 'styles/fonts/Questrial/Questrial-Regular.ttf'
import Montserrat from 'styles/fonts/Montserrat/Montserrat-VariableFont_wght.ttf'



export default createGlobalStyle`

    @font-face {
        font-family: 'Roboto';
        src: url(${Roboto}) format('truetype');
        font-display: block;
    }

    @font-face {
        font-family: 'Poppins';
        src: url(${Poppins}) format('truetype');
        font-display: block;
    }

    @font-face {
        font-family: 'Questrial';
        src: url(${Questrial}) format('truetype');
        font-display: block;
    }

    @font-face {
        font-family: 'Montserrat';
        src: url(${Montserrat}) format('truetype');
        font-display: block;
    }

    :root{
        --rgb-blue : 27, 73, 138;
        --rgb-orange : 255, 156, 0;
        --rgb-white : 255, 255, 255;
        --rgb-gray-1 : 169, 178, 188;
        --rgb-gray-2 : 112, 112, 112;
        --rgb-gray-3 : 57, 60, 70;
        --rgb-black : 1, 16, 33;
        --rgb-green : 63, 199, 131;
        --rgb-red : 255, 0, 0;

        --blue-color: rgb(var(--rgb-blue));
        --orange-color: rgb(var(--rgb-orange));
        --white-color: rgb(var(--rgb-white));
        --gray-1-color: rgb(var(--rgb-gray-1));
        --gray-2-color: rgb(var(--rgb-gray-2));
        --gray-3-color: rgb(var(--rgb-gray-3));
        --black-color: rgb(var(--rgb-black));
        --green-color: rgb(var(--rgb-green));
        --red-color: rgb(var(--rgb-red));

        --standard-font : 'Roboto';
    }
    html {
        background: var(--white-color);
        color: var(--black-color);
    }

    body, * {
        margin: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: var(--standard-font);
    }

    .list-group-item.active {
        color: var(--orange-color);
    }
`