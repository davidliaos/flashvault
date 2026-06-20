import subprocess, sys, time, os

project_dir = r"C:\Users\ray41\Projects\flashvault"
log_file = os.path.join(project_dir, ".next", "dev", "flashvault.log")

os.makedirs(os.path.dirname(log_file), exist_ok=True)

proc = subprocess.Popen(
    ["cmd", "/c", "npm", "run", "dev", "--", "--port", "3007"],
    cwd=project_dir,
    stdout=open(log_file, "w"),
    stderr=subprocess.STDOUT,
    shell=False,
)

print(f"Started Next.js dev server PID={proc.pid}")
print(f"Log: {log_file}")

# Wait for "Ready" signal
for i in range(60):
    time.sleep(1)
    if not os.path.exists(log_file):
        continue
    with open(log_file) as f:
        content = f.read()
    if "Ready in" in content or "Local:" in content:
        print("=== Server ready ===")
        # Print last 20 lines
        for line in content.strip().split("\n")[-20:]:
            print(line)
        break
    if "Error" in content or "error" in content:
        print("=== Error detected ===")
        for line in content.strip().split("\n")[-20:]:
            print(line)
        break
    print(f"  waiting... ({i+1}s)")
else:
    print("=== Timeout — last log output ===")
    with open(log_file) as f:
        for line in f.read().strip().split("\n")[-20:]:
            print(line)
