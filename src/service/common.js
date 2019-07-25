export const cropLongString = (str, countLetter) => {
    return str.length > countLetter ? str.substring(0, countLetter) + "..." : str;
}; 


export const getRandomColor = () => {
    return "#" +  Math.random().toString(16).substr(-6);
  }

  export const getRandomEmoji = () => {
    let iconValues = ["🎉", "📝", "💊", "🎻", "🎼", "🔊", "🏀", "👛", "🎭", "🎐", "🎊"];
    return iconValues[Math.floor(Math.random() * (iconValues.length-1))];
  }