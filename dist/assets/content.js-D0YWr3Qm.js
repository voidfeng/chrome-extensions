(function(){console.log("Content script 已加载");const t=document.createElement("div");t.id="word-tooltip";t.style.cssText=`
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 10000;
  display: none;
  min-width: 200px;
  min-height: 100px;
`;document.body.appendChild(t);const c=/^[a-zA-Z]+$/;let a=null;document.addEventListener("mouseup",e=>{if(t.contains(e.target))return;const o=window.getSelection(),n=o.toString().trim();if(n){const i=o.getRangeAt(0).getBoundingClientRect();t.textContent=n,t.style.display="block",t.style.left=i.left+window.scrollX+"px",t.style.top=i.bottom+window.scrollY+5+"px"}else t.style.display="none"});document.addEventListener("mousemove",e=>{a&&clearTimeout(a),a=setTimeout(()=>{const o=document.caretRangeFromPoint(e.clientX,e.clientY);if(!o)return;const n=o.startContainer;if(n.nodeType!==Node.TEXT_NODE)return;const s=n.textContent,i=o.startOffset;let d=i,l=i;for(;d>0&&c.test(s[d-1]);)d--;for(;l<s.length&&c.test(s[l]);)l++;const r=s.substring(d,l);r&&c.test(r)&&(t.textContent=r,t.style.display="block",t.style.left=e.pageX+10+"px",t.style.top=e.pageY+10+"px")},1e3)});document.addEventListener("mousedown",e=>{e.target!==t&&!t.contains(e.target)&&(t.style.display="none")});chrome.runtime.onMessage.addListener((e,o,n)=>(console.log("Content script 收到消息:",e),e.action==="buttonClicked"&&(console.log("按钮被点击了！"),document.body.style.border="5px solid red",n({status:"success",message:"操作完成"})),!0));
})()
