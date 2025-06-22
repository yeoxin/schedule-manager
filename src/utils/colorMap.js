export function getCategoryColor(category) {
    const colorMap = {
        공부: '#34d399', // green-400
        운동: '#facc15', // yellow-400
        약속: '#f472b6', // pink-400
        기타: '#9ca3af', // gray-400
    };

    return colorMap[category] || '#d1d5db'; // 기본 회색-300
}