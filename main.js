// The run interval is owned by the OBoard interval trigger. The trace itself is
// always IPv6 UDP, which is the structured SDK equivalent of traceroute6.
function main(run) {
  const trace = oboard.network.trace({
    server_id: env.TARGET_SERVER,
    target: env.TARGET,
    ip_family: 'ipv6',
    mode: 'udp',
    port: 33434,
    max_hops: env.MAX_HOPS,
    queries_per_hop: env.QUERIES_PER_HOP,
    per_hop_timeout_ms: env.PER_HOP_TIMEOUT_MS,
  })

  const path = trace.hops.map(hop => ({
    hop: hop.hop,
    addresses: hop.addresses,
    probes: hop.probes.map(probe => ({
      address: probe.address || null,
      rtt_ms: probe.rtt_ms || null,
      timeout: probe.timeout,
    })),
  }))

  log.info('IPv6 route trace completed', {
    target: trace.target,
    resolved_ip: trace.resolved_ip,
    reached: trace.reached,
    truncated: trace.truncated,
  })

  return {
    target: trace.target,
    resolved_ip: trace.resolved_ip,
    ip_family: trace.ip_family,
    mode: trace.mode,
    port: trace.port,
    reached: trace.reached,
    truncated: trace.truncated,
    duration_ms: trace.duration_ms,
    path: path,
    scheduled_at: run.scheduled_at || null,
  }
}
