const CountdownTimer = (() => {
    const config = {
        events: [
            { targetDate: "2025-04-04", targetName: "清明节" },
            { targetDate: "2025-05-01", targetName: "劳动节" },
            { targetDate: "2025-05-31", targetName: "端午节" },
            { targetDate: "2025-10-01", targetName: "国庆节" },    
            { targetDate: "2026-02-17", targetName: "春节" },            
            { targetDate: "2027-02-06", targetName: "春节" },            
            { targetDate: "2028-01-26", targetName: "春节" },            
            { targetDate: "2029-02-13", targetName: "春节" },            
            { targetDate: "2030-02-03", targetName: "春节" }           
        ],
        units: {
            day: { text: "今日", unit: "小时" },
            week: { text: "本周", unit: "天" },
            month: { text: "本月", unit: "天" },
            year: { text: "本年", unit: "天" }
        }
    };

    const calculators = {
        day: () => {
            const hours = new Date().getHours();
            return {
                remaining: 24 - hours,
                percentage: (hours / 24) * 100
            };
        },
        week: () => {
            const day = new Date().getDay();
            const passed = day === 0 ? 6 : day - 1;
            return {
                remaining: 6 - passed,
                percentage: ((passed + 1) / 7) * 100
            };
        },
        month: () => {
            const now = new Date();
            const total = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
            const passed = now.getDate() - 1;
            return {
                remaining: total - passed,
                percentage: (passed / total) * 100
            };
        },
        year: () => {
            const now = new Date();
            const start = new Date(now.getFullYear(), 0, 1);
            const total = 365 + (now.getFullYear() % 4 === 0 ? 1 : 0);
            const passed = Math.floor((now - start) / 86400000);
            return {
                remaining: total - passed,
                percentage: (passed / total) * 100
            };
        }
    };

    function getNextEvent() {
        const now = new Date();
        for (let i = 0; i < config.events.length; i++) {
            const eventDate = new Date(config.events[i].targetDate);
            if (eventDate > now) {
                return config.events[i];
            }
        }
        return config.events[config.events.length - 1];
    }

    function updateCountdown() {
        const elements = ['eventName', 'eventDate', 'daysUntil', 'countRight']
           .map(id => document.getElementById(id));

        if (elements.some(el => !el)) return;

        const [eventName, eventDate, daysUntil, countRight] = elements;
        const now = new Date();
        const nextEvent = getNextEvent();
        const target = new Date(nextEvent.targetDate);

        eventName.textContent = nextEvent.targetName;
        eventDate.textContent = nextEvent.targetDate;
        daysUntil.textContent = Math.round((target - now.setHours(0, 0, 0, 0)) / 86400000);

        countRight.innerHTML = Object.entries(config.units)
           .map(([key, { text, unit }]) => {
                const { remaining, percentage } = calculators[key]();
                return `
                    <div class="cd-count-item">
                        <div class="cd-item-name">${text}</div>
                        <div class="cd-item-progress">
                            <div class="cd-progress-bar" style="width: ${percentage}%; opacity: ${percentage}"></div>
                            <span class="cd-percentage ${percentage >= 46 ? 'cd-many' : ''}">${percentage.toFixed(2)}%</span>
                            <span class="cd-remaining ${percentage >= 60 ? 'cd-many' : ''}">
                                <span class="cd-tip">还剩</span>${remaining}<span class="cd-tip">${unit}</span>
                            </span>
                        </div>
                    </div>
                `;
            }).join('');
    }

    let timer;
    const start = () => {
        updateCountdown();
        timer = setInterval(updateCountdown, 600000);
    };

    ['pjax:complete', 'DOMContentLoaded'].forEach(event => document.addEventListener(event, start));
    document.addEventListener('pjax:send', () => timer && clearInterval(timer));

    return { start, stop: () => timer && clearInterval(timer) };
})();