/**
 * @version 3.0.0
 * @description 
 */
class AdsSDK {
    constructor(options = {}) {

        this.adShowTime = new Date().getTime();
        this.isAdSDKLoaded = false;
  
        this._initAdSDK();
        
    }

    /**
     * init sdk
     * @private
     */
    _initAdSDK() {

        this._loadAdScript(() => {
            this.isAdSDKLoaded = true;
        });
    }

    /**
     * 
     * @private
     */
    _loadAdScript(callback) {
       
        const script = document.createElement('script');
        const head = document.head || document.getElementsByTagName('head')[0];
        script.async = true;

        callback = callback || function() {};
        if (script.readyState) {
            script.onreadystatechange = () => {
                if (script.readyState === 'loaded' || script.readyState === 'complete') {
                    script.onreadystatechange = null;
                    callback();
                }
            }
        } else {
            script.onload = () => {
                callback();
            };
        }

        script.src = 'https://cdn.jsdelivr.net/npm/@jolibox/sdk@1/dist/index.iife.js';
      
        head?.appendChild(script);
        

        script.onload = () => {
         
            window.jolibox = new JoliboxSDK();
           
                        
                // 在游戏中初始化广告
            window.jolibox.ads.init();
    
            // 在需要预加载广告的地方（例如在游戏加载屏幕中）
            window.jolibox.ads.adConfig({
                preloadAdBreaks: "on",
                sound: "off",
                onReady: () => {
                    console.log("onReady");
                },
            });
    
        };
    }

    





    showAd(ad_type,success,failed){
        switch (ad_type) {
            case 'Interstitial':
                this.showInterstitialAd(success);
                break;

            case 'Reward':
                this.showRewardAd(success, failed);
                break;

            default:
                break;
        }
    }


    showInterstitialAd(success) {

        let  lastShowAdTime = ((new Date()).getTime() - this.adShowTime) / 1000;
                console.log(lastShowAdTime);
                if (lastShowAdTime > this.adIntervalTime) {
                   
                    console.log('==== h5_sdk showInterstitialAd ====');
                    this.adShowTime = (new Date()).getTime();
                    window.jolibox.ads.adBreak && ads.adBreak({
                        type: "next",
                        name: "next",
                        adBreakDone: () => {
                            success && success();
                        },
                    });
                } else {
                    success && success();
                }
    }


    showRewardAd(success, failed) {
      
        console.log('==== h5_sdk showRewardAd ====');
        window.jolibox.ads.adBreak({
            type: "reward",
            beforeReward(showAdFn) {
                // 处理广告播放前的逻辑，例如暂停游戏
                console.log("beforeReward");
                showAdFn();
            },
            adDismissed: () => {
                // 被告知广告已被用户关闭，并且没有达到奖励条件
                console.log("adDismissed");
                failed && failed();
            },
            adViewed: () => {
                // 被告知广告已被用户观看，并且达到奖励条件
                console.log("adViewed");
                success && success();
            },
            adBreakDone: (placementInfo) => {
                // 处理剩余逻辑，是否发放奖励，并恢复游戏状态
                console.log("adBreakDone", placementInfo);
                if (placementInfo.breakStatus !== "viewed") {
                        failed && failed();
                }
            },
        });
    }

    showGameLoadingCompleted() {
       
        window.jolibox.runtime.loadFinished();
        if (!window.isUploadCY)
           try {
               console.log("----uploadCYLoadComplete----");
               window.isUploadCY = !0;
               window.jolibox.ads.adBreak({
                   type: "preroll",
                   name: "my_preroll",
                   adBreakDone: () => {},// 也不要在这里初始化游戏，因为用户不关闭广告，则游戏无法初始化！！！
               });
           } catch (e) {}
    }
}


if (typeof window !== 'undefined') {
    window.AdsSDK = AdsSDK;
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdsSDK;
}
