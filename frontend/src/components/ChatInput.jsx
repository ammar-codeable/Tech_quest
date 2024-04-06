export default function ChatInput() {
  const handleKeyDown = (event) => {
    if(event.key === 'Enter' && event.shiftKey) {
      event.preventDefault();

      console.log(message);
      setMessage('');
    }
  }

  return (
    <div className="bottom-0 w-full p-4">
      <label
        htmlfor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your message
      </label>
      <textarea
        id="message"
        rows="4"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        className="block p-2.5  bottom-0 w-full h-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Start Chatting"
        onKeyDown={handleKeyDown}
      ></textarea>
    </div>
  );
}
