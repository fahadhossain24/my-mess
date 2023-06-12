import React from 'react';
import Typed from 'typed.js';

const AutoTypedText = () => {
    const el = React.useRef(null);

    React.useEffect(() => {
      const typed = new Typed(el.current, {
        strings: ['You can <span style="color: cyan">find mess</span> just one second - <span style="color: cyan">click Find Mess button</span>', 'You can <span style="color: cyan">create mess</span> here - <span style="color: cyan">click Create Mess button</span>', 'If you want to <span style="color: cyan">add as member,</span> you can - <span style="color: cyan">click Add as member button</span>'],
        typeSpeed: 100,
        backSpeed: 40,
        loop:true,
      });
      return () => {
        typed.destroy();
      };
    }, []);

    return (
        <div className='text-white'>
            <span ref={el} />
        </div>
    );
};

export default AutoTypedText;