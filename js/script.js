(function(){
//display border in left aside in click
    let links=document.querySelectorAll(".sidebar a");
    let themeMenu= document.querySelector(".colors-fonts-box");
    let overlay=document.createElement("div");
    overlay.className="overlay";
    let fonts=document.querySelectorAll(".fonts > div .line  span  ");
let colors=document.querySelectorAll(" .colors >div  span");
let backgroundSpan=document.querySelectorAll(".colors-fonts-box .background .contain > div ");
let message=document.querySelectorAll(".right .message-container .message");
let searchMessage=document.querySelector("main .right .messages .search input");
    /*check in local storage */
    window.onload=function()
    {
        if(window.localStorage.getItem("notification") !== null)
        {
            document.querySelector(".notif").style.display="none";
    
        }
        if(window.localStorage.getItem("message") !== null)
        {
            document.querySelector(".message").style.display="none";
    
        }
        if(window.localStorage.getItem("font") !== null)
        {
            document.documentElement.style.cssText=`font-size:${window.localStorage.getItem("font")}`;
    
        }
        if(window.localStorage.getItem("currentFontSpan" ) !== null )
        {
            
        fonts.forEach((font,index)=>{
            font.classList.remove("active");
            if(index == +(window.localStorage.getItem("currentFontSpan")))
            {
                font.classList.add("active");
            }
        });
        }
    
        if(window.localStorage.getItem("color") !== null)
        {
            document.documentElement.style.setProperty('--color-primary', window.localStorage.getItem("color"));
    
    
        }
        if(window.localStorage.getItem("currentColorSpan" ) !== null )
        {
            
        colors.forEach((color,index)=>{
            color.classList.remove("active");
            if(index == +(window.localStorage.getItem("currentColorSpan")))
            {
                color.classList.add("active");
            }
        });
        }

        if(window.localStorage.getItem("backgroundColor") !== null)
        {
            document.body.style.cssText=`background-color:${window.localStorage.getItem("backgroundColor")}`;
    
        }
        if(window.localStorage.getItem("currentBackground" ) !== null )
        {
            
        backgroundSpan.forEach((back,index)=>{
            back.classList.remove("active");
            if(index == +(window.localStorage.getItem("currentBackground")))
            {
                back.classList.add("active");
            }
        });
        }
    
    }
    /*check in local storage */

    links.forEach((link)=>{
        link.addEventListener("click",(e)=>{
            links.forEach(l=>{
                l.classList.remove("active");
            })

            e.target.closest("a").classList.add("active");
            if(e.target.closest("a").classList.contains("notifications"))
            {
                e.target.closest("a").querySelector(".notif").style.display="none";
                 /*Add chooce to local storage */
                 window.localStorage.setItem("notification","clicked");

            }
            if(e.target.closest("a").classList.contains("messages"))
            {
                e.target.closest("a").querySelector(".message").style.display="none";
                window.localStorage.setItem("message","clicked");

                document.querySelector(".right .messages").classList.add("hilight-message-box");

            setTimeout(()=>{
                document.querySelector(".right .messages").classList.remove("hilight-message-box");
                    
                },2000);
            }
            if(e.target.closest("a").classList.contains("theme"))
            {
               
                document.body.appendChild(overlay);
               themeMenu.style.display="block";
            }
        });
    });
    let closeThemeMenu=document.querySelector(".close");
    closeThemeMenu.addEventListener("click",(e)=>{
        themeMenu.style.display="none";
        overlay.remove()    ;
    });

    ///////////////////////////////////////////////////////////
    /*change website font */

    fonts.forEach((font)=>{
        font.addEventListener("click",(e)=>{
            fonts.forEach(f=>{
                f.classList.remove("active");
            });
            e.target.classList.add("active");
            window.localStorage.setItem("currentFontSpan",e.target.dataset.index);
            window.localStorage.setItem("font",e.target.dataset.font)
            document.documentElement.style.cssText=`font-size:${e.target.dataset.font}`;
        });
    });

    /*Change website colors */
    colors.forEach((color)=>{
        color.addEventListener("click",function(e){

            colors.forEach(c=>{
                c.classList.remove("active");
            });
            e.target.classList.add("active");
            window.localStorage.setItem("currentColorSpan",e.target.dataset.index);
            window.localStorage.setItem("color",e.target.dataset.color);

            document.documentElement.style.setProperty('--color-primary', e.target.dataset.color);
            
        });
    });
    //change background color 

    backgroundSpan.forEach(div=>{
        div.addEventListener("click",(e)=>{
            backgroundSpan.forEach(back=>{
                back.classList.remove("active");
            });
            e.target.closest("div").classList.add("active");
            document.body.style.cssText=`background-color:${e.target.closest("div").dataset.color}`;

            window.localStorage.setItem("currentBackground",e.target.closest("div").dataset.index);
            window.localStorage.setItem("backgroundColor",e.target.closest("div").dataset.color);

        });
    });
    function getMesseages()
    {
        let searchValue=searchMessage.value.toLowerCase();

        message.forEach((mess,index)=>{
            let val=mess.querySelector(".info h5").innerHTML.toLowerCase();
            if(val.indexOf(searchValue) != -1)
            {
                mess.style.display="flex"
            }else
            {
                mess.style.display="none"

            }
           
        });
    }
   searchMessage.addEventListener("keyup",(e)=>{
    getMesseages();
   });
}());
