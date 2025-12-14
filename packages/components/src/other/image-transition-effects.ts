import gsap from 'gsap';

import { ImageTransitionType } from '@monorepo/components';

export type ImageTransitionEffect = (
  current: HTMLDivElement,
  currentInner: HTMLDivElement,
  next: HTMLDivElement,
  nextInner: HTMLDivElement
) => gsap.core.Timeline;

export const animationEffects: Record<ImageTransitionType, ImageTransitionEffect> = {
  A: (current, currentInner, next, nextInner) => {
    const direction = 1;
    return gsap
      .timeline({
        defaults: {
          duration: 1.5,
          ease:     'power4.inOut',
        },
      })
      .addLabel('start', 0)
      .to(current, { yPercent: -direction * 100 }, 'start')
      .to(currentInner, { yPercent: direction * 30 }, 'start')
      .fromTo(next, { yPercent: direction * 100 }, { yPercent: 0 }, 'start')
      .fromTo(nextInner, { yPercent: -direction * 30 }, { yPercent: 0 }, 'start');
  },

  B: (current, currentInner, next, nextInner) => {
    const direction = 1;
    return gsap
      .timeline({
        defaults: {
          duration: 1.5,
          ease:     'power4.inOut',
        },
      })
      .addLabel('start', 0)
      .to(current, { yPercent: -direction * 100 }, 'start')
      .to(
        currentInner,
        {
          yPercent:        direction * 30,
          transformOrigin: '0% 100%',
          rotation:        -direction * 10,
          scaleY:          2.5,
        },
        'start',
      )
      .fromTo(next, { yPercent: direction * 100 }, { yPercent: 0 }, 'start')
      .fromTo(
        nextInner,
        {
          transformOrigin: '0% 0%',
          yPercent:        -direction * 30,
          scaleY:          2.5,
          rotation:        -direction * 10,
        },
        { yPercent: 0, scaleY: 1, rotation: 0 },
        'start',
      );
  },

  C: (current, currentInner, next, nextInner) => {
    const direction = 1;
    const tl        = gsap
      .timeline({
        defaults: {
          duration: 1.1,
          ease:     'power2.inOut',
        },
      })
      .addLabel('start', 0)
      .to(current, { scale: 0.4 }, 'start')
      .to(currentInner, { scale: 1.5 }, 'start')
      .addLabel('middle', 'start+=0.65')
      .fromTo(
        next,
        { yPercent: direction * 100, scale: 1 },
        { duration: 1, ease: 'expo', yPercent: 0 },
        'middle',
      )
      .fromTo(
        nextInner,
        { scale: 1.5, yPercent: -direction * 30 },
        { duration: 1.1, ease: 'expo', scale: 1, yPercent: 0 },
        'middle',
      );

    gsap.set(next, { zIndex: 99 });
    return tl;
  },

  // Fade and slide with scale
  D: (current, _currentInner, next, nextInner) => {
    const direction = 1;
    const tl        = gsap
      .timeline({
        defaults: {
          duration: 1.25,
          ease:     'power4.inOut',
        },
      })
      .addLabel('start', 0)
      .to(
        current,
        {
          duration:  0.4,
          ease:      'sine',
          scale:     0.9,
          autoAlpha: 0.2,
        },
        'start',
      )
      .to(
        current,
        {
          yPercent:  -direction * 20,
          autoAlpha: 0,
        },
        'start+=0.1',
      )
      .fromTo(
        next,
        {
          autoAlpha: 1,
          scale:     1,
          yPercent:  direction * 100,
        },
        { yPercent: 0 },
        'start+=0.1',
      )
      .fromTo(
        nextInner,
        { yPercent: -direction * 50 },
        { yPercent: 0 },
        'start+=0.1',
      );

    gsap.set(next, { zIndex: 99 });
    return tl;
  },

  // Scale and rotate transition
  E: (current, _currentInner, next, nextInner) => {
    const direction = 1;
    return gsap
      .timeline({
        defaults: {
          duration: 1.1,
          ease:     'power2.inOut',
        },
      })
      .addLabel('start', 0)
      .to(
        current,
        {
          scale:     0.6,
          yPercent:  -direction * 90,
          rotation:  direction * 20,
          autoAlpha: 0,
        },
        'start',
      )
      .fromTo(
        next,
        {
          scale:     0.8,
          yPercent:  direction * 100,
          rotation:  0,
          autoAlpha: 1,
        },
        { scale: 1, yPercent: 0 },
        'start+=0.1',
      )
      .fromTo(nextInner, { scale: 1.1 }, { scale: 1 }, 'start+=0.1');
  },

  // Horizontal slide with scale
  F: (current, currentInner, next, nextInner) => {
    const direction = 1;
    return gsap
      .timeline({
        defaults: {
          duration: 1.6,
          ease:     'power3.inOut',
        },
      })
      .addLabel('start', 0)
      .to(current, { xPercent: -direction * 100 }, 'start')
      .to(
        currentInner,
        {
          transformOrigin: '100% 50%',
          scaleX:          4,
        },
        'start',
      )
      .fromTo(next, { xPercent: direction * 100 }, { xPercent: 0 }, 'start')
      .fromTo(
        nextInner,
        {
          transformOrigin: '0% 50%',
          xPercent:        -direction * 100,
          scaleX:          4,
        },
        { xPercent: 0, scaleX: 1 },
        'start',
      );
  },

  // Scale from zero with brightness
  G: (current, _currentInner, next, nextInner) => {
    const direction = 1;
    const tl        = gsap
      .timeline({
        defaults: {
          duration: 1.2,
          ease:     'expo',
        },
      })
      .addLabel('start', 0)
      .to(current, { ease: 'power2', autoAlpha: 0 }, 'start')
      .fromTo(
        next,
        {
          autoAlpha: 1,
          scale:     0,
          yPercent:  direction * 100,
        },
        { scale: 1, yPercent: 0 },
        'start',
      )
      .fromTo(
        nextInner,
        {
          scale:  2,
          filter: 'brightness(600%)',
        },
        { scale: 1, filter: 'brightness(100%)' },
        'start',
      );

    gsap.set(next, { zIndex: 99 });
    return tl;
  },

  H: (current, currentInner, next, nextInner) => {
    const direction = 1;
    const tl        = gsap
      .timeline()
      .addLabel('start', 0)
      .fromTo(
        next,
        {
          autoAlpha: 1,
          scale:     0.1,
          xPercent:  direction * 100,
        },
        {
          duration: 0.7,
          ease:     'expo',
          scale:    0.4,
          xPercent: 0,
        },
        'start',
      )
      .fromTo(
        nextInner,
        {
          filter:          'contrast(100%) saturate(100%)',
          transformOrigin: '100% 50%',
          scaleX:          4,
        },
        {
          duration: 0.7,
          ease:     'expo',
          scaleX:   1,
        },
        'start',
      )
      .fromTo(
        currentInner,
        { filter: 'contrast(100%) saturate(100%)' },
        {
          duration: 0.7,
          ease:     'expo',
          filter:   'contrast(120%) saturate(140%)',
        },
        'start',
      )
      .addLabel('middle', 'start+=0.6')
      .to(
        next,
        {
          duration: 1,
          ease:     'power4.inOut',
          scale:    1,
        },
        'middle',
      )
      .to(
        current,
        {
          duration:  1,
          ease:      'power4.inOut',
          scale:     0.98,
          autoAlpha: 0,
        },
        'middle',
      );

    gsap.set(next, { zIndex: 99 });
    return tl;
  },

  I: (current, _currentInner, next, _nextInner) => {
    const direction = 1;
    const tl        = gsap
      .timeline({
        defaults: {
          duration: 1,
          ease:     'power3.inOut',
        },
      })
      .addLabel('start', 0)
      .to(
        current,
        {
          xPercent:  -direction * 15,
          yPercent:  -direction * 15,
          autoAlpha: 0,
        },
        'start',
      )
      .fromTo(
        next,
        {
          autoAlpha: 1,
          xPercent:  direction * 100,
          yPercent:  direction * 100,
        },
        {
          xPercent: 0,
          yPercent: 0,
        },
        'start',
      );

    gsap.set(next, { zIndex: 99 });
    return tl;
  },

  J: (current, currentInner, next, nextInner) => {
    const direction = 1;
    return gsap
      .timeline({
        defaults: {
          duration: 1.3,
        },
      })
      .addLabel('start', 0)
      .to(
        current,
        {
          duration: 0.4,
          ease:     'power2.in',
          yPercent: -direction * 100,
        },
        'start',
      )
      .to(
        currentInner,
        {
          duration: 0.4,
          ease:     'power2.in',
          yPercent: direction * 75,
          rotation: -direction * 2,
        },
        'start',
      )
      .fromTo(
        next,
        {
          autoAlpha: 1,
          yPercent:  direction * 100,
        },
        {
          ease:     'expo',
          yPercent: 0,
        },
        'start+=0.5',
      )
      .fromTo(
        nextInner,
        {
          yPercent: -direction * 75,
          rotation: direction * 2,
        },
        {
          ease:     'expo',
          yPercent: 0,
          rotation: 0,
        },
        'start+=0.5',
      );
  },

  K: (current, currentInner, next, nextInner) => {
    const direction = 1;
    return gsap
      .timeline({
        defaults: {
          duration: 1.2,
        },
      })
      .addLabel('start', 0)
      .to(
        current,
        {
          duration: 0.4,
          ease:     'power2.in',
          xPercent: -direction * 100,
        },
        'start',
      )
      .to(
        currentInner,
        {
          duration: 0.4,
          ease:     'power2.in',
          xPercent: direction * 75,
          rotation: -direction * 6,
        },
        'start',
      )
      .fromTo(
        next,
        {
          autoAlpha: 1,
          xPercent:  direction * 100,
        },
        {
          ease:     'power4',
          xPercent: 0,
        },
        'start+=0.4',
      )
      .fromTo(
        nextInner,
        {
          xPercent: -direction * 75,
          rotation: direction * 6,
        },
        {
          ease:     'power4',
          xPercent: 0,
          rotation: 0,
        },
        'start+=0.4',
      );
  },

  // Horizontal scale squeeze
  M: (current, _currentInner, next, _nextInner) => {
    return gsap
      .timeline({
        defaults: {
          duration: 1.2,
          ease:     'power4.inOut',
        },
      })
      .addLabel('start', 0)
      .to(
        current,
        {
          transformOrigin: '0% 50%',
          scaleX:          0,
          autoAlpha:       0,
        },
        'start',
      )
      .fromTo(
        next,
        {
          transformOrigin: '100% 50%',
          autoAlpha:       0,
          scaleX:          0,
        },
        {
          autoAlpha: 1,
          scaleX:    1,
        },
        'start',
      );
  },

  N: (current, _currentInner, next, _nextInner) => {
    const direction = 1;
    return gsap
      .timeline({
        defaults: {
          duration: 0.8,
          ease:     'power3.inOut',
        },
      })
      .addLabel('start', 0)
      .to(
        current,
        {
          scale:    1.1,
          rotation: direction * 2,
        },
        'start',
      )
      .addLabel('middle', '>')
      .fromTo(
        next,
        {
          scale:    1.1,
          rotation: direction * 2,
        },
        {
          duration: 1.1,
          ease:     'expo',
          scale:    1,
          rotation: 0,
        },
        'middle',
      );
  },

};
