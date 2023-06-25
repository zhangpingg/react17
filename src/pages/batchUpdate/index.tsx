// 批量更新：在react中的钩子函数、事件函数中
// 非批量更新：其他的promise、setTimeout、原生事件函数，都不会批量更新

import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';

const BatchUpdate = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // 1) react中的钩子函数（批量更新）
  useEffect(() => {
    setCount1(count => count + 1);
    setCount2(count => count + 1);
  }, []);
  // 2) React事件函数（批量更新）
  const fn1 = () => {
    setCount1(count1 + 1);
    setCount2(count2 + 1);
  }

  // 1) setTimeout（非批量更新）
  const fn2 = () => {
    setTimeout(() => {
      setCount1(count1 + 1);      // 更新一次
      setCount2(count2 + 1);      // 更新一次
    });
  }
  // 2) promise（非批量更新）
  const fn3 = () => {
    Promise.resolve().then(() => {
      setCount1(count1 + 1);      // 更新一次
      setCount2(count2 + 1);      // 更新一次
    });
  }
  // 3) 原生js事件（非批量更新）
  useEffect(() => {
    document.getElementById('btn')?.addEventListener('click', () => {
      setCount1(count => count + 1);        // 更新一次
      setCount2(count => count + 1);        // 更新一次
    });
  }, []);
  // 4) async await （非批量更新） 
  const fn4 = async () => {
    await setCount1(count => count + 1);    // 更新一次
    await setCount2(count => count + 1);    // 更新一次
  }
  // X) flushSync：如果仍然希望setState之后立即重新渲染，只需要使用 flushSync 包裹
  // 这个是react18的特性，但是在react17中好像也可以正常使用
  const fn5 = () => {
    // (1) 非批量更新
    flushSync(() => {
      setCount1(count => count + 1);    // 更新一次
    });
    flushSync(() => {
      setCount2(count => count + 1);    // 更新一次
    });
    // (2) flushSync 函数内部的多个 setState 还是批量更新（合并为一次渲染更新）
    flushSync(() => {
      setCount1(count => count + 1);
      setCount2(count => count + 1);
    });
  }

  console.log('渲染了');

  return (
    <div>
      <div>count1: {count1}</div>
      <div>count2: {count2}</div> <br />

      批量更新：<br />
      <button onClick={fn1}>React事件函数</button><br /><br />

      非批量更新：<br />
      <button onClick={fn2}>setTimeout</button>
      <button onClick={fn3}>promise</button>
      <button id="btn">原生事件绑定</button>
      <button onClick={fn4}>async await</button>
      <button onClick={fn5}>flushSync</button>
    </div>
  );
}

export default BatchUpdate;