function CountdownTimer({ className, countdown }) {

  return (
    <div className={className}>
      {countdown <= 0 ? (
        "Time's up!"
      ) : (
        countdown
      )}
    </div>
  );
}

export default CountdownTimer;
