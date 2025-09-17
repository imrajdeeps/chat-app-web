export default function Documentation() {
  return (
    <div className='max-w-5xl mx-auto px-6 py-12 space-y-12 text-gray-800'>
      {/* Header */}
      <header className='text-center space-y-2'>
        <h1 className='text-4xl font-bold text-blue-600'>
          📘 Chat App Documentation
        </h1>
        <p className='text-gray-600'>
          Project specification & development guide
        </p>
      </header>

      {/* Overview */}
      <section>
        <h2 className='text-2xl font-semibold mb-4'>1. Overview</h2>
        <p>
          This project is a <strong>real-time chat application</strong> built
          with <strong>React.js (frontend)</strong> and{' '}
          <strong>Node.js (backend)</strong> using <strong>WebSockets</strong>{' '}
          for communication. It supports{' '}
          <em>
            1:1 messaging, user authentication, presence, and notifications
          </em>
          {', '}
          with future expansion into groups, calls, and media sharing.
        </p>
      </section>

      {/* Tech Stack */}
      <section>
        <h2 className='text-2xl font-semibold mb-4'>2. Tech Stack</h2>
        <div className='grid md:grid-cols-2 gap-8'>
          <div className='p-4 rounded-lg border bg-gray-50'>
            <h3 className='text-lg font-semibold'>Frontend</h3>
            <ul className='list-disc pl-6 space-y-1'>
              <li>React.js</li>
              <li>Tailwind CSS</li>
              <li>WebSocket client</li>
            </ul>
          </div>
          <div className='p-4 rounded-lg border bg-gray-50'>
            <h3 className='text-lg font-semibold'>Backend</h3>
            <ul className='list-disc pl-6 space-y-1'>
              <li>Node.js</li>
              <li>ws (WebSocket library)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className='text-2xl font-semibold mb-4'>3. Features</h2>

        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-semibold text-blue-500'>
              🔹 Phase 1: MVP
            </h3>
            <ul className='list-disc pl-6'>
              <li>Real-time 1:1 messaging</li>
              <li>Chat UI with online/offline indicator</li>
              <li>Basic notifications & unread badge</li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold text-blue-500'>
              🔹 Phase 2: Intermediate
            </h3>
            <ul className='list-disc pl-6'>
              <li>Group chats with admin roles</li>
              <li>Typing indicators & read receipts</li>
              <li>Media sharing (images/files)</li>
              <li>Search & filters</li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold text-blue-500'>
              🔹 Phase 3: Advanced
            </h3>
            <ul className='list-disc pl-6'>
              <li>Voice & video calls (WebRTC)</li>
              <li>Push notifications</li>
              <li>End-to-End Encryption (E2EE)</li>
              <li>Dark mode, reactions, chat themes</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
