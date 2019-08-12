import { trigger, transition, style, animate } from '@angular/animations';


export const fadeStateTrigger = trigger('fade', [
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate(700)
    ]),
    transition (':leave', animate(0, style({
        opacity: 0
    })))
]);