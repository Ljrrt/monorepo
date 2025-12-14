import { ElementType, useEffect, useRef, useState, createElement, useMemo, HTMLAttributes, ReactNode } from 'react';

import { gsap } from 'gsap';

interface Properties extends HTMLAttributes<HTMLElement> {
  className?:             string;
  showCursor?:            boolean;
  hideCursorWhileTyping?: boolean;
  hideCursorOnComplete?:  boolean;
  cursorCharacter?:       '|' | '█' | '▮' | '▌' | '_' | ReactNode;
  cursorBlinkDuration?:   number;
  cursorClassName?:       string;
  text:                   string | string[];
  as?:                    ElementType;
  typingSpeed?:           number;
  initialDelay?:          number;
  pauseDuration?:         number;
  deletingSpeed?:         number;
  loop?:                  boolean;
  textColors?:            string[];
  variableSpeed?:         { min: number; max: number; };
  onSentenceComplete?:    (sentence: string, index: number) => void;
  startOnVisible?:        boolean;
  reverseMode?:           boolean;
}

export function TextType(properties: Properties) {
  const {
    text,
    as: Component = 'div',
    typingSpeed = 50,
    initialDelay = 100,
    pauseDuration = 500,
    deletingSpeed = 20,
    loop = true,
    className = '',
    showCursor = true,
    hideCursorWhileTyping = false,
    hideCursorOnComplete = false,
    cursorCharacter = '▌',
    cursorClassName = '',
    cursorBlinkDuration = 0.5,
    textColors = [],
    variableSpeed = { min: 10, max: 100 },
    onSentenceComplete,
    startOnVisible = true,
    reverseMode = false,
    ...props
  } = properties;

  const [displayedText, setDisplayedText]       = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting]             = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible]               = useState(!startOnVisible);
  const [previousText, setPreviousText]         = useState(text);
  const cursorRef                               = useRef<HTMLSpanElement>(null);
  const containerRef                            = useRef<HTMLElement>(null);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  useEffect(() => {
    if (previousText !== text && displayedText !== '') {
      setIsDeleting(true);
      setPreviousText(text);
    }
  }, [text, previousText, displayedText]);

  function getRandomSpeed() {
    if (!variableSpeed) return typingSpeed;

    const { min, max } = variableSpeed;

    return Math.random() * (max - min) + min;
  }

  function getCurrentTextColor() {
    if (textColors.length === 0) return;

    return textColors[currentTextIndex % textColors.length];
  };

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity:  0,
        duration: cursorBlinkDuration,
        repeat:   -1,
        yoyo:     true,
        ease:     'power2.inOut',
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible) return;

    let timeout: NodeJS.Timeout;

    const currentText   = textArray[currentTextIndex];
    const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText;

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false);

          setCurrentCharIndex(0);

          if (Array.isArray(text)) {
            if (currentTextIndex === textArray.length - 1 && !loop) {
              return;
            }

            if (onSentenceComplete) {
              onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
            }

            setCurrentTextIndex(prev => (prev + 1) % textArray.length);
          }

          timeout = setTimeout(() => {}, pauseDuration);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText(prev => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < processedText.length) {
          timeout = setTimeout(
            () => {
              setDisplayedText(prev => prev + processedText[currentCharIndex]);
              setCurrentCharIndex(prev => prev + 1);
            },
            variableSpeed ? getRandomSpeed() : typingSpeed,
          );
        } else {
          if (onSentenceComplete) {
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
          }

          if (Array.isArray(text) && textArray.length > 1) {
            timeout = setTimeout(() => {
              setIsDeleting(true);
            }, pauseDuration);
          }
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout);
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete,
    text,
  ]);

  const isComplete = currentCharIndex >= textArray[currentTextIndex].length && !isDeleting;

  const hideOnComplete = hideCursorOnComplete && isComplete;

  const shouldHideCursor = hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

  return createElement(
    Component,
    {
      ref:       containerRef,
      className: `inline-block whitespace-pre-wrap tracking-tight ${className}`,
      ...props,
    },
    <span className="inline" style={{ color: getCurrentTextColor() || 'inherit' }}>
      {displayedText}
    </span>,
    !hideOnComplete && showCursor && (
      <span
        ref={cursorRef}
        className={`ml-1 inline-block opacity-100 ${shouldHideCursor ? 'hidden' : ''} ${cursorClassName}`}
      >
        {cursorCharacter}
      </span>
    ),
  );
};
