import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <TransitionGroup
      component={null}
    >
      <CSSTransition
        key={location.pathname}
        classNames='page'
        timeout={500}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default PageTransition;