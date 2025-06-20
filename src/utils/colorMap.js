export function getCategoryColor(category) {
    const colorMap = {
        공부: 'bg-green-200',
        운동: 'bg-yellow-200',
        약속: 'bg-pink-200',
        기타: 'bg-gray-200',
    };

    return colorMap[category] || 'bg-gray-100';
}