ARG BUILD_FROM
FROM ${BUILD_FROM}

RUN cat > /tmp/gep_custom_cluster.py <<'PYCODE'
from dataclasses import dataclass
import typing

from chip.clusters.ClusterObjects import (
    ALL_ATTRIBUTES,
    ALL_CLUSTERS,
    Cluster,
    ClusterAttributeDescriptor,
    ClusterObjectDescriptor,
    ClusterObjectFieldDescriptor,
)
from chip.tlv import float32, uint

GEP_CUSTOM_CLUSTER_ID = 0xFFF1FC00


@dataclass
class GepCustomCluster(Cluster):
    id = GEP_CUSTOM_CLUSTER_ID

    descriptor = ClusterObjectDescriptor(
        Fields=[
            ClusterObjectFieldDescriptor(Label="target_flow_rate", Tag=0x0000, Type=typing.Optional[float32]),
            ClusterObjectFieldDescriptor(Label="current_flow_rate", Tag=0x0001, Type=typing.Optional[float32]),
            ClusterObjectFieldDescriptor(Label="target_ratio", Tag=0x0002, Type=typing.Optional[float32]),
            ClusterObjectFieldDescriptor(Label="current_ratio", Tag=0x0003, Type=typing.Optional[float32]),
            ClusterObjectFieldDescriptor(Label="lever_press_count", Tag=0x0004, Type=typing.Optional[uint]),
            ClusterObjectFieldDescriptor(Label="feature_map", Tag=0xFFFC, Type=uint),
            ClusterObjectFieldDescriptor(Label="cluster_revision", Tag=0xFFFD, Type=uint),
        ]
    )

    class Attributes:
        @dataclass
        class TargetFlowRate(ClusterAttributeDescriptor):
            cluster_id = GEP_CUSTOM_CLUSTER_ID
            attribute_id = 0x0000
            attribute_type = ClusterObjectFieldDescriptor(Type=typing.Optional[float32])
            value: typing.Optional[float32] = None

        @dataclass
        class CurrentFlowRate(ClusterAttributeDescriptor):
            cluster_id = GEP_CUSTOM_CLUSTER_ID
            attribute_id = 0x0001
            attribute_type = ClusterObjectFieldDescriptor(Type=typing.Optional[float32])
            value: typing.Optional[float32] = None

        @dataclass
        class TargetRatio(ClusterAttributeDescriptor):
            cluster_id = GEP_CUSTOM_CLUSTER_ID
            attribute_id = 0x0002
            attribute_type = ClusterObjectFieldDescriptor(Type=typing.Optional[float32])
            value: typing.Optional[float32] = None

        @dataclass
        class CurrentRatio(ClusterAttributeDescriptor):
            cluster_id = GEP_CUSTOM_CLUSTER_ID
            attribute_id = 0x0003
            attribute_type = ClusterObjectFieldDescriptor(Type=typing.Optional[float32])
            value: typing.Optional[float32] = None

        @dataclass
        class LeverPressCount(ClusterAttributeDescriptor):
            cluster_id = GEP_CUSTOM_CLUSTER_ID
            attribute_id = 0x0004
            attribute_type = ClusterObjectFieldDescriptor(Type=typing.Optional[uint])
            value: typing.Optional[uint] = None

        @dataclass
        class FeatureMap(ClusterAttributeDescriptor):
            cluster_id = GEP_CUSTOM_CLUSTER_ID
            attribute_id = 0xFFFC
            attribute_type = ClusterObjectFieldDescriptor(Type=uint)
            value: uint = 0

        @dataclass
        class ClusterRevision(ClusterAttributeDescriptor):
            cluster_id = GEP_CUSTOM_CLUSTER_ID
            attribute_id = 0xFFFD
            attribute_type = ClusterObjectFieldDescriptor(Type=uint)
            value: uint = 1


def register_gep_custom_cluster() -> None:
    ALL_CLUSTERS[GEP_CUSTOM_CLUSTER_ID] = GepCustomCluster
    attrs = ALL_ATTRIBUTES.setdefault(GEP_CUSTOM_CLUSTER_ID, {})
    attrs[GepCustomCluster.Attributes.TargetFlowRate.attribute_id] = GepCustomCluster.Attributes.TargetFlowRate
    attrs[GepCustomCluster.Attributes.CurrentFlowRate.attribute_id] = GepCustomCluster.Attributes.CurrentFlowRate
    attrs[GepCustomCluster.Attributes.TargetRatio.attribute_id] = GepCustomCluster.Attributes.TargetRatio
    attrs[GepCustomCluster.Attributes.CurrentRatio.attribute_id] = GepCustomCluster.Attributes.CurrentRatio
    attrs[GepCustomCluster.Attributes.LeverPressCount.attribute_id] = GepCustomCluster.Attributes.LeverPressCount
    attrs[GepCustomCluster.Attributes.FeatureMap.attribute_id] = GepCustomCluster.Attributes.FeatureMap
    attrs[GepCustomCluster.Attributes.ClusterRevision.attribute_id] = GepCustomCluster.Attributes.ClusterRevision


register_gep_custom_cluster()
PYCODE

RUN python3 - <<'PY'
from pathlib import Path
import matter_server.server as ms

server_dir = Path(ms.__file__).parent
cluster_file = server_dir / "gep_custom_cluster.py"
cluster_file.write_text(Path("/tmp/gep_custom_cluster.py").read_text(encoding="utf-8"), encoding="utf-8")

init_file = server_dir / "__init__.py"
text = init_file.read_text(encoding="utf-8")
inject = "from . import gep_custom_cluster\n"

if inject not in text:
    marker = "from .server import MatterServer\n"
    if marker in text:
        text = text.replace(marker, marker + inject)
    else:
        text += "\n" + inject
    init_file.write_text(text, encoding="utf-8")
PY