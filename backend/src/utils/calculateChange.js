


export  const calcluateChange = (current, previous) => {
      if (previous === 0) {
        return {
          change: current > 0 ? 100 : 0,
          trend: current > 0 ? "up" : "same"
        };
      }

      const percentage = ((current - previous) / previous) * 100
      
      return {
        change: Math.abs(percentage).toFixed(1),
        trend:percentage>0?"up":percentage<0?"down":"same"
      }
    }