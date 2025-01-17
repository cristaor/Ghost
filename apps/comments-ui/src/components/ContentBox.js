import AppContext from '../AppContext';
import Content from './content/Content';
import Loading from './content/Loading';
import React, {useContext} from 'react';
import {ROOT_DIV_ID} from '../utils/constants';

const ContentBox = ({done}) => {
    const luminance = (r, g, b) => {
        let a = [r, g, b].map(function (v) {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };

    const contrast = (rgb1, rgb2) => {
        let lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
        let lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
        let brightest = Math.max(lum1, lum2);
        let darkest = Math.min(lum1, lum2);
        return (brightest + 0.05) / (darkest + 0.05);
    };
    const {accentColor, colorScheme} = useContext(AppContext);

    const darkMode = () => {
        if (colorScheme === 'light') {
            return false;
        } else if (colorScheme === 'dark') {
            return true;
        } else {
            const containerColor = getComputedStyle(document.getElementById(ROOT_DIV_ID).parentNode).getPropertyValue('color');

            const colorsOnly = containerColor.substring(containerColor.indexOf('(') + 1, containerColor.lastIndexOf(')')).split(/,\s*/);
            const red = colorsOnly[0];
            const green = colorsOnly[1];
            const blue = colorsOnly[2];

            return contrast([255, 255, 255], [red, green, blue]) < 5;
        }
    };

    const containerClass = darkMode() ? 'dark' : '';
    const style = {
        '--gh-accent-color': accentColor ?? 'blue',
        paddingTop: 0,
        paddingBottom: 24 // remember to allow for bottom shadow on comment text box
    };

    return (
        <section className={'ghost-display ' + containerClass} data-testid="content-box" style={style}>
            {done ? <Content /> : <Loading />}
        </section>
    );
};

export default ContentBox;
