const originalLog = console;

export function restore() {
  console.log = originalLog.log;
  console.warn = originalLog.warn;
  console.error = originalLog.error;
}

export default function () {
  console.log = () => 'lol';
  console.warn = () => 'lol';
  console.error = () => 'lol';
}
